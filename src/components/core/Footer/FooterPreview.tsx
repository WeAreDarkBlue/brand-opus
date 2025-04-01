'use client'

import { useQuery, useSettings } from '@/sanity/loader/useQuery'

import FooterLayout from './FooterLayout'
import { footerQuery } from '@/sanity/lib/queries'
import { FooterPayload } from '@/types'
import { QueryResponseInitial } from '@sanity/react-loader'

type Props = {
  initial: QueryResponseInitial<FooterPayload | null>
}

export default function FooterPreview(props: Props) {
  const { initial } = props

  const { data } = useQuery<FooterPayload | null>(
    footerQuery,
    {},
    { initial },
  )

  return <FooterLayout data={data!} />
}
