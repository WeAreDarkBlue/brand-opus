'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { newsBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { NewsPayload } from '@/types'

import NewsPage from './NewsPage'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<NewsPayload | null>
}

export default function NewsPreview(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<NewsPayload | null>(
    newsBySlugQuery,
    params,
    { initial },
  )

  return <NewsPage data={data!} encodeDataAttribute={encodeDataAttribute} />
}
