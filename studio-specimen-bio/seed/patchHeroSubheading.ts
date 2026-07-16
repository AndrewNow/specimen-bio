/**
 * Migrates hero subheading from plain text to simpleBlockContent.
 *
 * Run from studio-specimen-bio:
 *   npx sanity exec seed/patchHeroSubheading.ts --with-user-token
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

function alreadyPortable(value: unknown): boolean {
  return Array.isArray(value) && value.some((block) => block?._type === 'block')
}

async function main() {
  const doc = await client.fetch<{subheading?: unknown}>(
    `*[_id == "heroSection"][0]{subheading}`,
  )
  if (!doc) {
    console.log('heroSection: not found, skipping')
    return
  }
  if (alreadyPortable(doc.subheading)) {
    console.log('heroSection: subheading already portable text, skipping')
    return
  }
  if (typeof doc.subheading !== 'string' || !doc.subheading.trim()) {
    console.log('heroSection: no string subheading to migrate, skipping')
    return
  }

  const subheading = [block('hero-sub', doc.subheading.trim())]
  await client.patch('heroSection').set({subheading}).commit()
  console.log('heroSection: migrated subheading → simpleBlockContent')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
