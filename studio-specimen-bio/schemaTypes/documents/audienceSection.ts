import {defineField, defineType} from 'sanity'

const audienceCardFields = [
  defineField({
    name: 'heading',
    title: 'Heading',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'body',
    title: 'Body paragraph',
    type: 'text',
    rows: 4,
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'features',
    title: 'Feature bullets',
    type: 'array',
    of: [{type: 'string'}],
    validation: (rule) => rule.min(1),
  }),
  defineField({
    name: 'cta',
    title: 'Button',
    type: 'cta',
    validation: (rule) => rule.required(),
  }),
]

/**
 * The two-card "who we serve" section: end users (demand) and providers (supply).
 */
export const audienceSection = defineType({
  name: 'audienceSection',
  title: 'Audiences (Demand & Supply)',
  type: 'document',
  fields: [
    defineField({
      name: 'demandCard',
      title: 'End users card (Demand)',
      type: 'object',
      fields: audienceCardFields,
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'supplyCard',
      title: 'Providers card (Supply)',
      type: 'object',
      fields: audienceCardFields,
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Audiences (Demand & Supply)'}),
  },
})
