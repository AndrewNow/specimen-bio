/**
 * Adds a mock second team member (Alfredo Staffa) to leadershipSection.
 * Run from studio-specimen-bio:
 *   npx sanity exec seed/patchLeadershipAlfredo.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const alfredo = {
  _key: 'tm-2',
  _type: 'teamMember',
  name: 'Alfredo Staffa',
  role: 'Co-Founder',
  pullquote:
    'Biospecimens are human donations from people who want to contribute to cures — not a market commodity.',
  // Reuse Peter's photo as placeholder mock imagery
  photo: {
    _type: 'image',
    alt: 'Alfredo Staffa',
    asset: {
      _type: 'reference',
      _ref: 'image-fac808a186f8dffddf82d745c22c2a51de591e47-800x800-jpg',
    },
  },
  attributes: [
    {
      _type: 'iconItem',
      _key: 'alf-a1',
      icon: 'building',
      text: 'Co-Founder & Partner',
    },
    {
      _type: 'iconItem',
      _key: 'alf-a2',
      icon: 'briefcase',
      text: '20+ years in biospecimen operations & partnerships',
    },
    {
      _type: 'iconItem',
      _key: 'alf-a3',
      icon: 'handshake',
      text: 'Built provider networks across North America & Europe',
    },
  ],
  linkedinLabel: 'linkedin.com/in/alfredostaffa',
  linkedinUrl: 'https://linkedin.com/in/alfredostaffa',
}

async function main() {
  const doc = await client.fetch<{
    teamMembers?: Array<{_key?: string; name?: string}> | null
  } | null>(`*[_id == "leadershipSection"][0]{teamMembers}`)

  if (!doc) {
    console.log('leadershipSection: not found')
    process.exit(1)
  }

  const existing = doc.teamMembers ?? []
  if (existing.some((m) => m.name === alfredo.name || m._key === alfredo._key)) {
    console.log('leadershipSection: Alfredo already present, skipping')
    return
  }

  if (existing.length >= 2) {
    console.log('leadershipSection: already has 2 members, skipping')
    return
  }

  await client
    .patch('leadershipSection')
    .set({teamMembers: [...existing, alfredo]})
    .commit()

  console.log(`leadershipSection: added Alfredo (${existing.length + 1} members)`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
