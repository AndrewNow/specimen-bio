/**
 * Patches Site settings footer legal links to the CMS legal pages.
 * Run from studio-specimen-bio:
 *   npx sanity exec seed/patchFooterLegal.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const footerLegalLinks = [
  {_type: 'navLink', _key: 'fl-privacy', label: 'Privacy Policy', href: '/legal/privacy-policy'},
  {_type: 'navLink', _key: 'fl-officer', label: 'Privacy Officer', href: '/legal/privacy-officer'},
  {_type: 'navLink', _key: 'fl-cookies', label: 'Cookie Settings', href: '/legal/cookie-settings'},
]

async function main() {
  await client
    .patch('siteSettings')
    .set({footerLegalLinks})
    .commit()
  console.log('Updated siteSettings.footerLegalLinks')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
