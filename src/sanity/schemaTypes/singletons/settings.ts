import { richTextPreview } from '@/sanity/lib/utils'
import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import media from '../blocks/media'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Item list',
      description: 'Links displayed on the header of your site.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'menuItem',
          title: 'Menu Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'submenu',
              title: 'Submenu',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'submenuItem',
                  title: 'Submenu Item',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'bgType',
                      title: 'Background Type',
                      type: 'string',
                      options: {
                        list: ['image', 'video'],
                      },
                      initialValue: 'image',
                    }),
                    defineField({
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                      hidden: ({ parent }) => parent?.bgType !== 'image',
                    }),
                    defineField({
                      name: 'video',
                      title: 'Video',
                      type: 'file',
                      hidden: ({ parent }) => parent?.bgType !== 'video',
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'link',
                    })
                  ],
                  preview: {
                    select: {
                      title: 'link.title',
                      image: 'image.asset.url',
                    },
                    prepare({ title, image }) {
                      const titlePreview = richTextPreview(title)
                      return {
                        title: titlePreview,
                        subtitle: 'Submenu Item',
                        imageUrl: image
                      }
                    }
                  }
                })
              ]
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'newsArchive',
      title: 'Insights Archive',
      type: 'seo',
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Menu Items',
      }
    },
  },
})
