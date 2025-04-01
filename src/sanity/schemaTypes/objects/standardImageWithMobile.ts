import { DesktopIcon, MobileDeviceIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'standardImageWithMobile',
  type: 'object',
  title: 'Image Desktop / Mobile',
  groups: [
    {
      name: 'desktop',
      title: 'Desktop image',
      default: true,
      icon: DesktopIcon,
    },
    {
      name: 'mobile',
      title: 'Mobile image',
      icon: MobileDeviceIcon,
    },
  ],
  fields: [
    defineField({
      group: 'desktop',
      type: 'object',
      name: 'desktop',
      fields: [
        defineField({
          name: 'desktopAlt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) =>
            Rule.error(
              'Alternative text must be provided to meet EAA accessibility requirements.',
            ).required(),
        }),
        defineField({
          name: 'desktopCaption',
          type: 'richTextLite',
          title: 'Caption (optional)',
        }),
        defineField({
          name: 'desktopImage',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
            collapsible: false,
          },
        }),
      ],
    }),
    defineField({
      group: 'mobile',
      type: 'object',
      name: 'mobile',
      fields: [
        defineField({
          name: 'mobileAlt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) =>
            Rule.error(
              'Alternative text must be provided to meet EAA accessibility requirements.',
            ).required(),
        }),
        defineField({
          name: 'mobileCaption',
          type: 'richTextLite',
          title: 'Caption (optional)',
        }),
        defineField({
          name: 'mobileImage',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
            collapsible: false,
          },
        }),
      ],
    }),
  ],
  preview: {
    // select: {
    //   imageUrl: 'desktop.asset.url',
    //   alt: 'desktop.alt',
    //   filename: 'desktop.asset.originalFilename'
    // },
    // prepare({imageUrl, filename, alt}) {
    //   return {
    //     imageUrl: imageUrl,
    //     title: alt || filename
    //   }
    // }
  },
})
