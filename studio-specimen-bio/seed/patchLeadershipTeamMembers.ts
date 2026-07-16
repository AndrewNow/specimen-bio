/**
 * Migrates leadershipSection.teamMember (single object) → teamMembers (array).
 * Run from studio-specimen-bio:
 *   npx sanity exec seed/patchLeadershipTeamMembers.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

async function main() {
  const doc = await client.fetch<{
    teamMember?: Record<string, unknown> | null
    teamMembers?: unknown[] | null
  } | null>(`*[_id == "leadershipSection"][0]{teamMember, teamMembers}`)

  if (!doc) {
    console.log('leadershipSection: not found, skipping')
    return
  }

  if (Array.isArray(doc.teamMembers) && doc.teamMembers.length > 0) {
    console.log('leadershipSection: teamMembers already present, skipping')
    return
  }

  if (!doc.teamMember || typeof doc.teamMember !== 'object') {
    console.log('leadershipSection: no teamMember to migrate, skipping')
    return
  }

  const teamMembers = [
    {
      ...doc.teamMember,
      _type: 'teamMember',
      _key: 'tm-1',
    },
  ]

  await client
    .patch('leadershipSection')
    .set({teamMembers})
    .unset(['teamMember'])
    .commit()

  console.log('leadershipSection: migrated teamMember → teamMembers[1]')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
