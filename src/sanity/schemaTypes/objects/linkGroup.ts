import { defineField } from 'sanity'

export default defineField({
  name: 'linkGroup',
  type: 'object',
  title: 'Link Group',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Group Title',
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      of: [
        {
          type: 'link',
        },
      ],
    }),
  ],
})
