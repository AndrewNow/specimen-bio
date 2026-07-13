import {defineField, defineType} from 'sanity'

/**
 * A button/action. Most CTAs on the site open one of the two contact
 * forms rather than navigating, so the action is modeled explicitly.
 */
export const cta = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'action',
      title: 'What happens on click',
      type: 'string',
      initialValue: 'requestForm',
      options: {
        list: [
          {title: 'Open the “Request biospecimens” form', value: 'requestForm'},
          {title: 'Open the “Become a provider” form', value: 'providerForm'},
          {title: 'Go to a link', value: 'link'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link URL',
      description: 'Used only when the action is “Go to a link”. Can be a page anchor (e.g. #about), a path, or a full URL.',
      type: 'string',
      hidden: ({parent}) => parent?.action !== 'link',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {action?: string} | undefined
          if (parent?.action === 'link' && !value) {
            return 'A URL is required when the action is “Go to a link”'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'action'},
  },
})
