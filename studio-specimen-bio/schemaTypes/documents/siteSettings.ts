import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'brand', title: 'Brand', default: true},
    {name: 'navigation', title: 'Navigation'},
    {name: 'footer', title: 'Footer'},
    {name: 'contact', title: 'Contact info'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Brand
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      group: 'brand',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'brand',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),

    // Navigation
    defineField({
      name: 'navLinks',
      title: 'Navigation links',
      type: 'array',
      group: 'navigation',
      of: [{type: 'navLink'}],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'navProviderCta',
      title: '“Become a Provider” button',
      type: 'cta',
      group: 'navigation',
    }),
    defineField({
      name: 'navRequestCta',
      title: '“Request Biospecimens” button',
      type: 'cta',
      group: 'navigation',
    }),

    // Footer
    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      description: 'Short line under the brand name in the footer.',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerCompanyLinks',
      title: '“Company” column links',
      type: 'array',
      group: 'footer',
      of: [{type: 'navLink'}],
    }),
    defineField({
      name: 'footerServiceLinks',
      title: '“Services” column items',
      description: 'Items can link somewhere or open a contact form.',
      type: 'array',
      group: 'footer',
      of: [{type: 'cta'}],
    }),
    defineField({
      name: 'footerLegalLinks',
      title: 'Legal links',
      description: 'e.g. Privacy Policy, Terms.',
      type: 'array',
      group: 'footer',
      of: [{type: 'navLink'}],
    }),
    defineField({
      name: 'copyrightName',
      title: 'Copyright holder',
      description: 'Rendered as “© <year> <name>. All rights reserved.” The year updates automatically.',
      type: 'string',
      group: 'footer',
    }),

    // Contact info
    defineField({
      name: 'contactEmail',
      title: 'General contact email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'contact',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO & social sharing',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
