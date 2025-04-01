import { CogIcon,DesktopIcon, MobileDeviceIcon }  from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'imageVideoAsset',
  title: 'Image or Video asset',
  type: 'object',
  groups: [
    {
      name: 'desktop',
      title: 'Desktop',
      default: true,
      icon: DesktopIcon,
    },
    {
      name: 'mobile',
      title: 'Mobile',
      icon: MobileDeviceIcon,
    },
  ],
  fields: [
    defineField({
      name: 'selected',
      title: 'Select type',
      type: 'string',
      initialValue: 'image',
      group: ['desktop', 'mobile'],
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {
            title: 'Image',
            value: 'image',
          },
          {
            title: 'Video',
            value: 'video',
          }
        ]
      }
    }),
    defineField({
      name: 'videoDesktop',
      title: 'Video Desktop URL (YouTube or Vimeo)',
      description: 'Please add either a URL or a file below. If both are added, the URL will be used.',
      type: 'string',
      group: 'desktop',
      hidden: ({ parent }) => parent?.selected !== 'video'
    }),
    defineField({
      name: 'videoDesktopOverlay',
      title: 'Video Desktop Overlay URL (YouTube or Vimeo)',
      type: 'string',
      group: 'desktop',
      hidden: ({ parent }) => parent?.selected !== 'video'
    }),
    defineField({
      name: 'videoMobile',
      title: 'Video Mobile URL (YouTube or Vimeo)',
      type: 'string',
      group: 'mobile',
      hidden: ({ parent }) => parent?.selected !== 'video'
    }),
    defineField({
      name: 'videoMobileOverlay',
      title: 'Video Mobile Overlay URL (YouTube or Vimeo)',
      type: 'string',
      group: 'mobile',
      hidden: ({ parent }) => parent?.selected !== 'video'
    }),
    defineField({
      name: 'imageDesktop',
      type: 'standardImageNoCaption',
      group: 'desktop',
      hidden: ({ parent }) => parent?.selected !== 'image'
    }),
    defineField({
      name: 'imageMobile',
      type: 'standardImageNoCaption',
      group: 'mobile',
      hidden: ({ parent }) => parent?.selected !== 'image'
    })
  ],
  validation: Rule => Rule.custom(fields => (
    fields?.youtube && fields?.vimeo ? 'Only one of YouTube or Vimeo can be used.' : true
  )).error(),
  preview: {
    prepare() {
      return {
        title: 'Image / Video asset'
      }
    }
  }
})
