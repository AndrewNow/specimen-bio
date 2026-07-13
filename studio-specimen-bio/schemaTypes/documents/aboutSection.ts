import {defineField, defineType} from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About (Who we are)',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'Small label above the heading, e.g. “About Specimen Bio”.',
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
      title: 'Heading — second line',
      type: 'string',
    }),
    defineField({
      name: 'paragraphs',
      title: 'Body paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 4}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'callouts',
      title: 'Callouts',
      description: 'Short icon + text highlights shown alongside the body copy.',
      type: 'array',
      of: [{type: 'iconItem'}],
    }),
  ],
  preview: {
    prepare: () => ({title: 'About (Who we are)'}),
  },
})
