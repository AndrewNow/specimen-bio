/**
 * Migrates about, leadership, and audience section body fields from plain
 * strings / string arrays to simpleBlockContent (portable text).
 *
 * Run from studio-specimen-bio:
 *   npx sanity exec seed/patchSectionRichText.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

function block(key: string, text: string) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `${key}s`, text, marks: []}],
  }
}

function paragraphsToBlocks(paragraphs: string[], keyPrefix: string) {
  return paragraphs
    .map((text) => text?.trim())
    .filter(Boolean)
    .map((text, i) => block(`${keyPrefix}-p${i + 1}`, text))
}

function stringToBlocks(text: string, keyPrefix: string) {
  if (typeof text !== 'string' || !text.trim()) return null
  return [block(`${keyPrefix}-p1`, text.trim())]
}

function alreadyPortable(value: unknown): boolean {
  return Array.isArray(value) && value.some((block) => block?._type === 'block')
}

async function migrateAbout() {
  const doc = await client.fetch<{paragraphs?: string[]; body?: unknown}>(
    `*[_id == "aboutSection"][0]{paragraphs, body}`,
  )
  if (!doc) {
    console.log('aboutSection: not found, skipping')
    return
  }
  if (alreadyPortable(doc.body)) {
    console.log('aboutSection: body already portable text, skipping')
    return
  }
  const source = Array.isArray(doc.paragraphs) ? doc.paragraphs : []
  const body = paragraphsToBlocks(source, 'about')
  if (!body.length) {
    console.log('aboutSection: no paragraphs to migrate, skipping')
    return
  }
  await client.patch('aboutSection').set({body}).unset(['paragraphs']).commit()
  console.log(`aboutSection: migrated ${body.length} paragraph(s) → body`)
}

async function migrateLeadership() {
  const doc = await client.fetch<{paragraphs?: string[]; body?: unknown}>(
    `*[_id == "leadershipSection"][0]{paragraphs, body}`,
  )
  if (!doc) {
    console.log('leadershipSection: not found, skipping')
    return
  }
  if (alreadyPortable(doc.body)) {
    console.log('leadershipSection: body already portable text, skipping')
    return
  }
  const source = Array.isArray(doc.paragraphs) ? doc.paragraphs : []
  const body = paragraphsToBlocks(source, 'lead')
  if (!body.length) {
    console.log('leadershipSection: no paragraphs to migrate, skipping')
    return
  }
  await client.patch('leadershipSection').set({body}).unset(['paragraphs']).commit()
  console.log(`leadershipSection: migrated ${body.length} paragraph(s) → body`)
}

async function migrateAudiences() {
  const doc = await client.fetch<{
    demandCard?: {body?: unknown}
    supplyCard?: {body?: unknown}
  }>(`*[_id == "audienceSection"][0]{demandCard{body}, supplyCard{body}}`)
  if (!doc) {
    console.log('audienceSection: not found, skipping')
    return
  }

  const patch: Record<string, unknown> = {}
  let changed = 0

  for (const [cardKey, prefix] of [
    ['demandCard', 'demand'],
    ['supplyCard', 'supply'],
  ] as const) {
    const current = doc[cardKey]?.body
    if (alreadyPortable(current)) continue
    if (typeof current !== 'string') continue
    const blocks = stringToBlocks(current, prefix)
    if (!blocks) continue
    patch[`${cardKey}.body`] = blocks
    changed += 1
  }

  if (!changed) {
    console.log('audienceSection: card bodies already portable text (or empty), skipping')
    return
  }

  await client.patch('audienceSection').set(patch).commit()
  console.log(`audienceSection: migrated ${changed} card body field(s)`)
}

async function main() {
  await migrateAbout()
  await migrateLeadership()
  await migrateAudiences()
  console.log('Done')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
