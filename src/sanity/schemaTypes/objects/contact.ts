import { defineField } from 'sanity'

export default defineField({
  name: 'contact',
  type: 'object',
  title: 'Contact',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
  ],
})
