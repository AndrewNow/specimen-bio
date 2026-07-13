import {defineField, defineType} from 'sanity'

export const capabilitiesSection = defineType({
  name: 'capabilitiesSection',
  title: 'Capabilities (Global network)',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge text',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'stats',
      title: 'Headline stats',
      description: 'e.g. “16+ / Disease areas”.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Stat',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        },
      ],
    }),
    defineField({
      name: 'cards',
      title: 'Capability cards',
      description: 'One card per list: disease areas, sample types, source countries.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'capabilityCard',
          title: 'Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Card title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Activity / pulse', value: 'activity'},
                  {title: 'Test tube', value: 'testTube'},
                  {title: 'Globe', value: 'globe'},
                ],
              },
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{type: 'string'}],
              options: {layout: 'tags'},
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: {title: 'title', items: 'items'},
            prepare: ({title, items}) => ({
              title,
              subtitle: items ? `${items.length} items` : undefined,
            }),
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Capabilities (Global network)'}),
  },
})
