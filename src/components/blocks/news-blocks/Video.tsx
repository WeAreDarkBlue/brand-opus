'use client'

import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'

interface VideoProps {
  data: {
    video: {
      url: string
    }
  }
}
const Video = ({ data }: VideoProps) => {
  const [videoUrl, setVideoUrl] = useState<string>('')

  useEffect(() => {
    if (data.video?.url) {
      setVideoUrl(data.video.url)
    }
  }, [data.video])
  return (
    <div className="relative grid grid-cols-4 md:grid-cols-12 gap-x-4 lg:gap-x-8">
      {videoUrl && (
        <div className="relative col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2 pt-[56.25%]">
          <ReactPlayer
            url={videoUrl}
            controls={true}
            width="100%"
            height="100%"
            className="absolute inset-0"
          />
        </div>
      )}
    </div>
  )
}

export default Video
