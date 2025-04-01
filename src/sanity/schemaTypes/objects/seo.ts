import { defineField } from 'sanity'

export default defineField({
  title: 'SEO settings',
  name: 'seo',
  type: 'object',
  fields: [
    defineField({
      title: 'Page title',
      name: 'title',
      type: 'string',
      description: 'Displays in the tab',
      validation: (Rule) =>
        Rule.required()
          .max(60)
          .warning('Required, must be under 60 characters'),
    }),
    defineField({
      title: 'Meta description',
      name: 'description',
      type: 'text',
      validation: (Rule) =>
        Rule.max(155).warning('Must be under 155 characters'),
    }),
    defineField({
      title: 'Opengraph image',
      description: 'Facebook recommends 1200x630 (will be auto resized)',
      name: 'ogImage',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      route: 'route.slug.current',
    },
    prepare({ title, route }) {
      return {
        title,
        subtitle: route ? `Route: /${route}/` : 'Not set',
      }
    },
  },
})
