import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { slugifyFunc } from '@/sanity/lib/utils'

import fieldGroups from '../groups/pageGroups'

export default defineType({
  type: 'document',
  name: 'category',
  title: 'Categories',
  icon: PackageIcon,
  ...fieldGroups,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'page',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'The URL slug for this category',
      options: {
        source: 'title',
        maxLength: 100,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        slugify: slugifyFunc(),
      },
      validation: (Rule) => Rule.required(),
      group: 'page',
    }),
    defineField({
      name: 'salesforceListId',
      type: 'string',
      title: 'Saleforce Mailing List ID',
      description:
        'The ID of the Salesforce mailing list for this category. This can be overridden on a individual posts.',
      group: 'page',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
