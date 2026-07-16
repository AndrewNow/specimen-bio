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
      name: 'body',
      title: 'Body',
      description: 'Paragraph text with optional bold, italic, and links.',
      type: 'simpleBlockContent',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Careers CTA label',
      description: 'Links to /careers. Defaults to “View open roles” if empty.',
      type: 'string',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team member cards',
      description:
        'One card sits beside the body text. Two cards stack beneath the body in a row.',
      type: 'array',
      validation: (rule) => rule.max(2),
      of: [
        {
          type: 'object',
          name: 'teamMember',
          title: 'Team member',
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
              name: 'pullquote',
              title: 'Pull quote',
              description: 'Shown beneath the photo and name. Leave empty to hide.',
              type: 'text',
              rows: 3,
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
          preview: {
            select: {title: 'name', subtitle: 'role'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Leadership'}),
  },
})
