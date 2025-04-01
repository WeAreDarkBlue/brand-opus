import { defineField } from 'sanity'

export default defineField({
  name: 'navTheme',
  type: 'string',
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
      {
        title: 'Light with solid background',
        value: 'light-bg',
      },
      {
        title: 'Dark with solid background',
        value: 'dark-bg',
      },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
})
