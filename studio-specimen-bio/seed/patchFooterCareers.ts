/**
 * Adds a Careers link to Site settings footer company links.
 * Run from studio-specimen-bio:
 *   npx sanity exec seed/patchFooterCareers.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const careersLink = {
  _type: 'navLink',
  _key: 'fc-careers',
  label: 'Careers',
  href: '/careers',
}

async function main() {
  const settings = await client.fetch<{
    footerCompanyLinks?: Array<{_key?: string; href?: string; label?: string}>
  } | null>(`*[_id == "siteSettings"][0]{footerCompanyLinks}`)

  const existing = settings?.footerCompanyLinks ?? []
  const alreadyPresent = existing.some(
    (link) => link.href === '/careers' || link.label === 'Careers',
  )

  if (alreadyPresent) {
    console.log('Careers link already present on siteSettings.footerCompanyLinks')
    return
  }

  await client
    .patch('siteSettings')
    .set({footerCompanyLinks: [...existing, careersLink]})
    .commit()

  console.log('Added Careers to siteSettings.footerCompanyLinks')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
