import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & social sharing',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Browser tab / search result title',
      type: 'string',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Search result description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      description: 'Shown when the site is shared on LinkedIn, Slack, etc. Recommended 1200×630.',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
  ],
})
