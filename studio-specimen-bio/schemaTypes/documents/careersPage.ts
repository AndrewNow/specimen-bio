import {defineField, defineType} from 'sanity'

export const careersPage = defineType({
  name: 'careersPage',
  title: 'Careers page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Careers',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      description: 'Short lead under the title on the careers index.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'emptyState',
      title: 'Empty state message',
      description: 'Shown when there are no open roles.',
      type: 'text',
      rows: 3,
      initialValue:
        'We do not have any open roles right now. Check back soon, or reach out if you think you would be a fit.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Careers page'}),
  },
})
