import {defineField, defineType} from 'sanity'

const formVariantFields = [
  defineField({
    name: 'title',
    title: 'Form title',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    rows: 3,
  }),
  defineField({
    name: 'submitLabel',
    title: 'Submit button label',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'messagePlaceholder',
    title: 'Message field placeholder',
    type: 'text',
    rows: 2,
  }),
]

const labeledField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({name: 'label', title: 'Label', type: 'string'}),
      defineField({name: 'placeholder', title: 'Placeholder', type: 'string'}),
    ],
  })

export const contactForms = defineType({
  name: 'contactForms',
  title: 'Contact forms',
  type: 'document',
  groups: [
    {name: 'request', title: 'Request form', default: true},
    {name: 'provider', title: 'Provider form'},
    {name: 'shared', title: 'Shared fields & messages'},
  ],
  fields: [
    defineField({
      name: 'requestForm',
      title: '“Request biospecimens” form',
      type: 'object',
      group: 'request',
      fields: formVariantFields,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'providerForm',
      title: '“Become a provider” form',
      type: 'object',
      group: 'provider',
      fields: formVariantFields,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fields',
      title: 'Form field labels',
      type: 'object',
      group: 'shared',
      options: {collapsible: true, collapsed: false},
      fields: [
        labeledField('name', 'Name field'),
        labeledField('email', 'Email field'),
        labeledField('organization', 'Organization field'),
        defineField({
          name: 'messageLabel',
          title: 'Message field label',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'successHeading',
      title: 'Success heading',
      type: 'string',
      group: 'shared',
    }),
    defineField({
      name: 'successBody',
      title: 'Success message',
      type: 'text',
      rows: 2,
      group: 'shared',
    }),
    defineField({
      name: 'errorFallback',
      title: 'Generic error message',
      type: 'string',
      group: 'shared',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Contact forms'}),
  },
})
