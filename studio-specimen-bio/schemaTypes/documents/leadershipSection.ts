import {defineField, defineType} from 'sanity'

export const leadershipSection = defineType({
  name: 'leadershipSection',
  title: 'Leadership',
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
      name: 'paragraphs',
      title: 'Body paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 4}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'ctaLabel',
      title: '“About the team” button label',
      description: 'Leave empty to hide the button.',
      type: 'string',
    }),
    defineField({
      name: 'teamMember',
      title: 'Featured team member',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'role',
          title: 'Role / title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'photo',
          title: 'Photo',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'attributes',
          title: 'Credentials',
          description: 'Icon + text lines, e.g. years of experience, former roles, degrees.',
          type: 'array',
          of: [{type: 'iconItem'}],
        }),
        defineField({
          name: 'linkedinLabel',
          title: 'LinkedIn link text',
          type: 'string',
        }),
        defineField({
          name: 'linkedinUrl',
          title: 'LinkedIn URL',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Leadership'}),
  },
})
