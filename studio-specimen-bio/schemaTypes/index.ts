// Shared objects
import {cta} from './objects/cta'
import {navLink} from './objects/navLink'
import {iconItem} from './objects/iconItem'
import {seo} from './objects/seo'
import {blockContent} from './objects/blockContent'
import {simpleBlockContent} from './objects/simpleBlockContent'

// Section documents (singletons)
import {siteSettings} from './documents/siteSettings'
import {heroSection} from './documents/heroSection'
import {aboutSection} from './documents/aboutSection'
import {audienceSection} from './documents/audienceSection'
import {processSection} from './documents/processSection'
import {capabilitiesSection} from './documents/capabilitiesSection'
import {leadershipSection} from './documents/leadershipSection'
import {closingCtaSection} from './documents/closingCtaSection'
import {contactForms} from './documents/contactForms'
import {legalPage} from './documents/legalPage'
import {careersPage} from './documents/careersPage'
import {jobListing} from './documents/jobListing'

export const schemaTypes = [
  // objects
  cta,
  navLink,
  iconItem,
  seo,
  blockContent,
  simpleBlockContent,
  // documents
  siteSettings,
  heroSection,
  aboutSection,
  audienceSection,
  processSection,
  capabilitiesSection,
  leadershipSection,
  closingCtaSection,
  contactForms,
  legalPage,
  careersPage,
  jobListing,
]

/**
 * Types that must exist exactly once. Used by the desk structure and the
 * document action guards in sanity.config.ts.
 */
export const singletonTypes = new Set([
  'siteSettings',
  'heroSection',
  'aboutSection',
  'audienceSection',
  'processSection',
  'capabilitiesSection',
  'leadershipSection',
  'closingCtaSection',
  'contactForms',
  'careersPage',
])
