import {defineField, defineType} from 'sanity'

export const jobListing = defineType({
  name: 'jobListing',
  title: 'Job listing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Role title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      description: 'e.g. Operations, Business Development',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Remote, Montréal, Hybrid',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'full-time'},
          {title: 'Part-time', value: 'part-time'},
          {title: 'Contract', value: 'contract'},
          {title: 'Internship', value: 'internship'},
        ],
        layout: 'radio',
      },
      initialValue: 'full-time',
    }),
    defineField({
      name: 'isOpen',
      title: 'Open for applications',
      type: 'boolean',
      description: 'Uncheck to hide this role from the public careers list.',
      initialValue: true,
    }),
    defineField({
      name: 'postedAt',
      title: 'Posted date',
      type: 'date',
      description: 'Optional. Used for sorting and display.',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Short blurb shown on the careers index.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'body',
      title: 'Description',
      type: 'blockContent',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'applyUrl',
      title: 'Apply URL',
      type: 'url',
      description: 'External application link (Greenhouse, Lever, etc.).',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'applyEmail',
      title: 'Apply email',
      type: 'string',
      description: 'Shown as a mailto apply option when set.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  validation: (rule) =>
    rule.custom((doc) => {
      if (!doc?.applyUrl && !doc?.applyEmail) {
        return 'Provide an apply URL, an apply email, or both.'
      }
      return true
    }),
  orderings: [
    {
      title: 'Posted date, newest',
      name: 'postedAtDesc',
      by: [
        {field: 'postedAt', direction: 'desc'},
        {field: 'title', direction: 'asc'},
      ],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      location: 'location',
      isOpen: 'isOpen',
      slug: 'slug.current',
    },
    prepare: ({title, department, location, isOpen, slug}) => ({
      title: title ?? 'Untitled role',
      subtitle: [
        isOpen === false ? 'Closed' : 'Open',
        department,
        location,
        slug ? `/careers/${slug}` : null,
      ]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
