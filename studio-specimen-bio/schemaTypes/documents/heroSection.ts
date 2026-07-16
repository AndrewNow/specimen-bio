import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge text',
      description: 'Small pill above the main heading.',
      type: 'string',
    }),
    defineField({
      name: 'headingLine1',
      title: 'Heading — first line',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headingLine2',
      title: 'Heading — second line (underlined)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      description: 'One style of text with optional bold, italic, and links.',
      type: 'simpleBlockContent',
      validation: (rule) => rule.required().min(1),
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
  ],
  preview: {
    select: {title: 'headingLine1', subtitle: 'headingLine2'},
    prepare: ({title, subtitle}) => ({
      title: 'Hero',
      subtitle: [title, subtitle].filter(Boolean).join(' '),
    }),
  },
})
