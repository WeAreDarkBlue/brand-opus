import { PortableTextBlock } from 'next-sanity'
import { Image } from 'sanity'

import RenderImage from '@/components/common/RenderImage'
import RichText from '@/components/common/RichText/RichText'

interface ImageWithCopyProps {
  data: {
    alignment: string
    title: string
    image1: Image
    richTextContent: PortableTextBlock[]
  }
}
const ImageWithCopy = ({ data }: ImageWithCopyProps) => {
  return (
    <div className="relative grid grid-cols-4 md:grid-cols-12 gap-4 lg:gap-8">
      <div
        className={`${data.alignment === 'left' ? 'lg:col-start-2' : 'lg:col-start-7 md:order-2'} aspect-[15/17] col-span-4 md:col-span-6 lg:col-span-5 relative`}
      >
        {data.image1 && (
          <RenderImage
            className="object-cover h-full"
            image={data.image1}
            sizes="(max-width: 480px) 768px, (max-width: 1024px) 1280px, 1500px"
          />
        )}
      </div>
      <div
        className={`${data.alignment === 'left' ? 'md:col-span-6' : 'lg:col-start-1 md:col-span-6 md:order-1'} col-span-4 grid grid-cols-4 md:grid-cols-6 gap-x-4 lg:gap-x-8`}
      >
        <div
          className={`${data.alignment === 'left' ? 'col-span-4 md:col-span-2' : 'col-span-4 md:col-span-2 lg:col-start-2'} `}
        >
          {data.title && (
            <h3 className="text-xl-m md:text-xl font-bold mb-6">
              {data.title}
            </h3>
          )}
        </div>
        <div
          className={`${data.alignment === 'left' ? 'lg:col-span-3' : 'lg:col-span-3'} col-span-4 md:col-span-4`}
        >
          {data.richTextContent && <RichText content={data.richTextContent} />}
        </div>
      </div>
    </div>
  )
}

export default ImageWithCopy
