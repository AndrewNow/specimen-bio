import type {StructureResolver, StructureBuilder} from 'sanity/structure'

/**
 * Each section of the site is a singleton document, listed here in the
 * order it appears on the page so editors can navigate top-to-bottom.
 */
const singletonItem = (S: StructureBuilder, type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singletonItem(S, 'siteSettings', 'Site settings'),
      S.divider().title('Home page sections'),
      singletonItem(S, 'heroSection', 'Hero'),
      singletonItem(S, 'aboutSection', 'About (Who we are)'),
      singletonItem(S, 'audienceSection', 'Audiences (Demand & Supply)'),
      singletonItem(S, 'processSection', 'Process'),
      singletonItem(S, 'capabilitiesSection', 'Capabilities (Global network)'),
      singletonItem(S, 'leadershipSection', 'Leadership'),
      singletonItem(S, 'closingCtaSection', 'Closing call to action'),
      S.divider().title('Other'),
      singletonItem(S, 'contactForms', 'Contact forms'),
      S.divider().title('Careers'),
      singletonItem(S, 'careersPage', 'Careers page'),
      S.documentTypeListItem('jobListing').title('Job listings'),
      S.divider().title('Legal'),
      S.documentTypeListItem('legalPage').title('Legal pages'),
    ])
