import { defineField } from 'sanity'

import { colorOptions, paddingOptions } from '@/sanity/lib/themeOptions'

export default defineField({
  name: 'blockOptions',
  title: 'Block Options',
  type: 'object',
  fields: [
    defineField({
      name: 'paddingTop',
      title: 'Top spacing',
      type: 'string',
      initialValue: paddingOptions[3].top || '',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: paddingOptions.map((option) => ({
          title: option.title,
          value: option.top,
        })),
      },
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Bottom spacing',
      type: 'string',
      initialValue: paddingOptions[3].bottom || '',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: paddingOptions.map((option) => ({
          title: option.title,
          value: option.bottom,
        })),
      },
    }),
    defineField({
      name: 'anchorLink',
      title: 'Anchor link',
      type: 'string',
      description: 'Add an anchor to link to this block',
    }),
  ],
})
