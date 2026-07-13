import {defineField, defineType} from 'sanity'

export const processSection = defineType({
  name: 'processSection',
  title: 'Process',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge text',
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
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      description: 'Numbered automatically in the order listed here.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'processStep',
          title: 'Step',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Process'}),
  },
})
