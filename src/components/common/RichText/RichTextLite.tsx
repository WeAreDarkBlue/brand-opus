import { PortableText } from '@portabletext/react'
import React from 'react'

import SanityLink from '@/components/common/SanityLink'
import { cn } from '@/lib/utils'

const components = {
  marks: {
    link: ({ value = null, children }) => {
      if (!value) return children
      const { link, href } = value
      return (
        <SanityLink link={link || href}>
          {children}
        </SanityLink>
      )
    },
  },
}

const RichTextLite = ({ content, className = '' }) => {
  return (
    <div className={cn('rich-text-lite', className)}>
      <PortableText value={content} components={components} />
    </div>
  )
}

export default RichTextLite
