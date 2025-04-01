import { defineField } from 'sanity'

export default defineField({
  name: 'themeColor',
  type: 'string',
  initialValue: 'dark',
  options: {
    list: [
      {
        title: 'Light',
        value: 'light',
      },
      {
        title: 'Dark',
        value: 'dark',
      },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
})
