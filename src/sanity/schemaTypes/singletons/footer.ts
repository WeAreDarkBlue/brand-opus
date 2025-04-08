import { ChevronDownIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'footer',
  title: 'Footer',
  icon: ChevronDownIcon,
  initialValue: {
    __i18n_lang: 'en',
  },
  groups: [
    {
      name: 'navigation',
      title: 'Navigation',
      default: true,
    },
    {
      name: 'info',
      title: 'Company Info',
    },
    {
      name: 'social',
      title: 'Social Media',
    },
    {
      name: 'join',
      title: 'Join',
    },
    {
      name: 'cta',
      title: 'CTA',
    },
  ],
  fields: [
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'content',
          type: 'richTextLite',
        }
      ],
      group: 'info',
    }),
    defineField({
      name: 'contacts',
      title: 'Contacts',
      type: 'array',
      of: [
        { type: 'contact' }
      ],
      group: 'info',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'navigation',
      title: 'Footer Link Groups',
      description: 'These are the groups of links on the right side of the footer.',
      type: 'array',
      of: [{ type: 'linkGroup' }],
      group: 'navigation',
    }),
    defineField({
      name: 'lowerLinks',
      title: 'Lower Links',
      description:
        'These are the small links shown alongside the copyright information',
      type: 'array',
      of: [{ type: 'link' }],
      group: 'navigation',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
      group: 'social',
    }),
    defineField({
        title: 'Internal link',
        name: 'reference',
        type: 'reference',
        to: [{ type: 'page' }],
      group: 'join',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'cta',
          type: 'link',
        },
      ],
      group: 'cta',
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
      }
    },
  },
})
