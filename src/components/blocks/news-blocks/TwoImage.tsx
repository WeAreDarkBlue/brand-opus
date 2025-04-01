'use client'

import { useEffect, useState } from 'react'
import { Image } from 'sanity'

import RenderImage from '@/components/common/RenderImage'

interface TwoImageProps {
  data: {
    image1: Image
    image2: Image
    image3: Image
  }
}
const TwoImage = ({ data }: TwoImageProps) => {
  const imageClasses =
    'col-span-4 md:col-span-6 lg:col-span-5 relative md:aspect-[15/17]'
  const [isMobile, setIsMobile] = useState(false)

  const checkMobile = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  })
  return (
    <div className="relative grid grid-cols-4 md:grid-cols-12 gap-4 lg:gap-8">
      <div className={`${imageClasses} lg:col-start-2`}>
        {data.image1 && (
          <RenderImage
            image={data.image1}
            sizes="(max-width: 480px) 768px, (max-width: 1024px) 1024px, 1280px"
            fill={isMobile ? false : true}
          />
        )}
      </div>
      <div className={imageClasses}>
        {data.image2 && (
          <RenderImage
            image={data.image2}
            sizes="(max-width: 480px) 768px, (max-width: 1024px) 1024px, 1280px"
            fill={isMobile ? false : true}
          />
        )}
      </div>
    </div>
  )
}

export default TwoImage
