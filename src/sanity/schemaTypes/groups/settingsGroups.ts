import { CodeBlockIcon, CogIcon, StackIcon, StarIcon } from '@sanity/icons'
import { isDarkBlueAdmin } from '@/sanity/lib/utils'

const settingsGroups = {
  groups: [
    {
      name: 'logo',
      title: 'Logo',
      default: true,
      icon: StarIcon,
    },
    {
      name: 'social',
      title: 'Social',
      icon: StarIcon,
    },
    {
      name: 'sitewideBlocks',
      title: 'Sitewide Blocks',
      description: 'Blocks that appear on every page (unless overridden)',
      icon: StackIcon,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: CodeBlockIcon,
    },
    {
      name: 'advanced',
      title: 'Advanced',
      icon: CogIcon,
      hidden: !isDarkBlueAdmin,
    },
  ],
}

export default settingsGroups
