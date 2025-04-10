import { ChevronUpIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'header',
  title: 'Header',
  icon: ChevronUpIcon,
  initialValue: {
    __i18n_lang: 'en',
  },
  groups: [
    {
      name: 'navigation',
      title: 'Navigation',
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'headerNavigation',
      title: 'Navigation Links',
      type: 'array',
      of: [{ type: 'linkGroup' }],
      group: 'navigation',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header',
      }
    },
  },
})
