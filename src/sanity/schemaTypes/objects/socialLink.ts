import { defineField } from 'sanity'

export default defineField({
  name: 'socialLink',
  type: 'object',
  title: 'Social Link',
  fields: [
    defineField({
      name: 'socialType',
      title: 'Social Media Service',
      type: 'string',
      options: {
        list: ['instagram', 'linkedin', 'tiktok'],
      },
      initialValue: 'instagram',
    }),
    defineField({
      name: 'handle',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
  ],
})
