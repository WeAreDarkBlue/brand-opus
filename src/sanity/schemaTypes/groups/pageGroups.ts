import {
  BlockElementIcon,
  CogIcon,
  DocumentTextIcon,
  SearchIcon,
} from '@sanity/icons'

const pageGroups = {
  groups: [
    {
      name: 'page',
      title: 'Page',
      default: true,
      icon: DocumentTextIcon,
    },
    {
      name: 'blocks',
      title: 'Content Blocks',
      icon: BlockElementIcon,
    },
    {
      name: 'options',
      title: 'Options',
      icon: CogIcon,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: SearchIcon,
    },
  ],
}
export default pageGroups
