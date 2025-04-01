import { Image } from 'sanity'

import RenderImage from '@/components/common/RenderImage'

interface SingleImageProps {
  data: {
    image: Image
  }
}
const SingleImage = ({ data }: SingleImageProps) => {
  const imageClasses =
    'col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2 relative'

  return (
    <div className="relative grid grid-cols-4 md:grid-cols-12 gap-x-4 lg:gap-x-8">
      FUCK
      <div className={imageClasses}>
        {data.image && (
          <RenderImage
            image={data.image}
            sizes="(max-width: 480px) 768px, (max-width: 1024px) 1280px, 1500px"
          />
        )}
      </div>
    </div>
  )
}

export default SingleImage
