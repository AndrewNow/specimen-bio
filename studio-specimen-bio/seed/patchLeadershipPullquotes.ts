/**
 * Sets leadership pullquotes and removes those quotes from the body.
 * Run from studio-specimen-bio:
 *   npx sanity exec seed/patchLeadershipPullquotes.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const PETER_QUOTE =
  'We created Specimen Bio to fill a gap we kept seeing. Busy End Users, busy Providers, poorly executed projects.'

const ALFREDO_QUOTE =
  "What's more, biospecimens are often treated like a market commodity. After all, these are human donations from people who want to contribute to the development of cures, not lining Brokers' pockets."

async function main() {
  const doc = await client.fetch<{
    body?: Array<{_key?: string; children?: Array<{text?: string}>}> | null
    teamMembers?: Array<{_key: string; name?: string; pullquote?: string | null}> | null
  } | null>(`*[_id == "leadershipSection"][0]{body, teamMembers}`)

  if (!doc?.teamMembers?.length) {
    console.log('leadershipSection: missing teamMembers')
    process.exit(1)
  }

  const teamMembers = doc.teamMembers.map((member) => {
    if (member.name?.includes('Peter')) {
      return {...member, pullquote: PETER_QUOTE}
    }
    if (member.name?.includes('Alfredo')) {
      return {...member, pullquote: ALFREDO_QUOTE}
    }
    return member
  })

  // Keep only body paragraphs that are not the quoted lines
  const body = (doc.body ?? []).filter((block) => {
    const text = (block.children ?? []).map((c) => c.text ?? '').join('')
    return !text.startsWith('Peter:') && !text.startsWith('Alfredo:')
  })

  await client.patch('leadershipSection').set({teamMembers, body}).commit()

  console.log(
    `leadershipSection: set pullquotes, body now ${body.length} paragraph(s)`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
