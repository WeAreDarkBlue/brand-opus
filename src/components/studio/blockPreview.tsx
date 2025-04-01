import { Badge, Box, Flex } from '@sanity/ui'
import { PreviewProps } from 'sanity'

import { blockLocaleString, richTextPreview } from '@/sanity/lib/utils'

interface BlockPreviewProps extends PreviewProps {
  locale?: Array<string>
  richTextSubtitle?: any[]
}

export function BlockPreview(props: BlockPreviewProps) {
  const localeString = props.locale ? blockLocaleString(props.locale) : ''

  return (
    <Flex align="center">
      <Box flex={1}>
        {props.renderDefault({ ...props, title: props?.schemaType?.title })}
      </Box>
      {localeString && <Badge tone="caution">{localeString}</Badge>}
    </Flex>
  )
}
