import { PortableTextBlock } from 'next-sanity'

import RichText from '@/components/common/RichText/RichText'

interface TextColumnsProps {
  data: {
    leftColumn: {
      title: string
      richTextContent: PortableTextBlock[]
    }
    rightColumn: {
      title: string
      richTextContent: PortableTextBlock[]
    }
  }
}
const TextColumns = ({ data }: TextColumnsProps) => {
  return (
    <div className="relative grid grid-cols-4 md:grid-cols-12 gap-4 lg:gap-x-8 py-4 mb-6 md:mb-0 gap-y-12 md:gap-y-0">
      <div
        className={`col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-2 ${data.rightColumn && '2xl:col-span-4 2xl:col-start-2'} ${!data.leftColumn && 'hidden md:block'} flex flex-col md:flex-row gap-4 lg:gap-8`}
      >
        {data.leftColumn?.title && (
          <h3
            className={`text-xl-m md:text-xl font-bold mb-3 md:mb-6 ${!data.rightColumn && 'mt-4 md:mt-0'}`}
          >
            {data.leftColumn?.title}
          </h3>
        )}
        {data.leftColumn?.richTextContent && (
          <RichText content={data.leftColumn?.richTextContent} />
        )}
      </div>
      <div
        className={`col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-7 ${data.leftColumn && '2xl:col-span-4 2xl:col-start-8'} ${!data.rightColumn && 'hidden md:block'} flex flex-col md:flex-row gap-4 lg:gap-8`}
      >
        {data.rightColumn?.title && (
          <h3
            className={`text-xl-m md:text-xl font-bold mb-3 md:mb-6 ${!data.leftColumn && 'mt-4 md:mt-0'}`}
          >
            {data.rightColumn?.title}
          </h3>
        )}
        {data.rightColumn?.richTextContent && (
          <RichText content={data.rightColumn?.richTextContent} />
        )}
      </div>
    </div>
  )
}

export default TextColumns
