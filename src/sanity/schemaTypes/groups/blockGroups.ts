import { CogIcon, DocumentTextIcon } from '@sanity/icons'

const blockGroups = {
  groups: [
    {
      name: 'block',
      title: 'Block',
      default: true,
      icon: DocumentTextIcon,
    },
    {
      name: 'options',
      title: 'Options',
      icon: CogIcon,
    },
  ],
}

export default blockGroups
