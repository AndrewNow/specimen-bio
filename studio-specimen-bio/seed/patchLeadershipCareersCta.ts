/**
 * Sets the leadership section careers CTA label.
 * Run from studio-specimen-bio:
 *   npx sanity exec seed/patchLeadershipCareersCta.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const CTA_LABEL = 'View open roles'

async function main() {
  const doc = await client.fetch<{ctaLabel?: string | null} | null>(
    `*[_id == "leadershipSection"][0]{ctaLabel}`,
  )

  if (!doc) {
    console.log('leadershipSection: not found')
    process.exit(1)
  }

  if (doc.ctaLabel === CTA_LABEL) {
    console.log(`leadershipSection: ctaLabel already "${CTA_LABEL}"`)
    return
  }

  await client.patch('leadershipSection').set({ctaLabel: CTA_LABEL}).commit()
  console.log(`leadershipSection: set ctaLabel to "${CTA_LABEL}"`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
