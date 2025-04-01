import { defineField } from 'sanity'

export default defineField({
  name: 'richTextLite',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block',
      options: {},
      styles: [],
      lists: [],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                title: 'External link',
                name: 'href',
                type: 'string',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: false,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Internal link',
                name: 'reference',
                type: 'reference',
                to: [{ type: 'home' }, { type: 'page' }, { type: 'project' }],
              },
            ],
          },
        ],
      },
    },
  ],
})
