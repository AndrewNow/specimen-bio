import {defineField, defineType} from 'sanity'

/**
 * A short line of text paired with an icon, used for the "About" callouts
 * and the leadership attribute list. Icons are rendered by the website
 * from a fixed set, so editors pick from a list rather than uploading.
 */
export const iconItem = defineType({
  name: 'iconItem',
  title: 'Icon item',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Handshake', value: 'handshake'},
          {title: 'Route / path', value: 'route'},
          {title: 'Clipboard check', value: 'clipboardCheck'},
          {title: 'Microscope', value: 'microscope'},
          {title: 'Briefcase', value: 'briefcase'},
          {title: 'Building', value: 'building'},
          {title: 'Graduation cap', value: 'graduationCap'},
          {title: 'Globe', value: 'globe'},
          {title: 'Test tube', value: 'testTube'},
          {title: 'Activity / pulse', value: 'activity'},
          {title: 'Thumbs up', value: 'thumbsUp'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'text', subtitle: 'icon'},
  },
})
