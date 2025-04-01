import { PortableText } from '@portabletext/react'
import React, { forwardRef } from 'react'

import SanityLink from '@/components/common/SanityLink'
import { classNames } from '@/lib/frontend-utils'

const components: any = {
  block: {
    normal: ({ children }) => <span>{children}</span>,
  },
  marks: {
    link: ({ value = null, children }) => {
      if (!value) return children
      const { button, link, href } = value
      return (
        <SanityLink className={button ?? 'button'} link={link || href}>
          {children}
        </SanityLink>
      )
    },
  },
}

const InlineFormattedText = ({ content, className = '' }, ref) => {
  return (
    <div className={classNames('rich-text-lite', className)} ref={ref}>
      <PortableText value={content} components={components} />
    </div>
  )
}

export default forwardRef(InlineFormattedText)
