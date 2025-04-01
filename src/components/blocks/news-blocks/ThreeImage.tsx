'use client'

import { useEffect, useState } from 'react'
import { Image } from 'sanity'

import RenderImage from '@/components/common/RenderImage'

interface ThreeImageProps {
  data: {
    image1: Image
    image2: Image
    image3: Image
    alignment: string
  }
}
const ThreeImage = ({ data }: ThreeImageProps) => {
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
    <div className="relative grid grid-cols-4 md:grid-cols-12 md:grid-rows-2 gap-4 lg:gap-8">
      <div
        className={`${data.alignment === 'left' ? 'md:row-span-2 lg:col-span-5 lg:col-start-2 md:aspect-[15/17]' : 'lg:col-start-2 lg:col-span-5 md:row-end-2'} col-span-4 md:col-span-6 relative`}
      >
        {data.image1 && (
          <RenderImage
            image={data.image1}
            sizes="(max-width: 480px) 768px, (max-width: 1024px) 1024px, 1280px"
            fill={isMobile ? false : true}
          />
        )}
      </div>
      <div
        className={`${data.alignment === 'left' ? 'lg:col-span-5' : 'lg:col-span-5 row-start-1 row-end-3 md:aspect-[15/17]'} col-span-4 md:col-span-6 relative`}
      >
        {data.image2 && (
          <RenderImage
            image={data.image2}
            sizes="(max-width: 480px) 768px, (max-width: 1024px) 1024px, 1280px"
            fill={isMobile ? false : true}
          />
        )}
      </div>
      <div
        className={`${data.alignment === 'left' ? 'lg:col-span-5' : 'lg:col-start-2 lg:col-span-5'} col-span-4 md:col-span-6 relative`}
      >
        {data.image3 && (
          <RenderImage
            image={data.image3}
            sizes="(max-width: 480px) 768px, (max-width: 1024px) 1024px, 1280px"
            fill={isMobile ? false : true}
          />
        )}
      </div>
    </div>
  )
}

export default ThreeImage
