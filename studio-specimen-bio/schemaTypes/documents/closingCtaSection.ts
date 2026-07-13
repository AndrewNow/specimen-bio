import {defineField, defineType} from 'sanity'

export const closingCtaSection = defineType({
  name: 'closingCtaSection',
  title: 'Closing call to action',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary button',
      type: 'cta',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary button',
      type: 'cta',
    }),
    defineField({
      name: 'directContactText',
      title: 'Direct contact line',
      description: 'Text shown before the email address, e.g. “Or reach us directly at”. The email itself comes from Site settings → Contact info.',
      type: 'string',
    }),
  ],
  preview: {
    select: {subtitle: 'heading'},
    prepare: ({subtitle}) => ({title: 'Closing call to action', subtitle}),
  },
})
