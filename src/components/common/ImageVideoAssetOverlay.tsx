import dynamic from 'next/dynamic';

import PlayButton from './PlayButton';

const VideoModal = dynamic(() => import('@/components/common/VideoModal'), {
  ssr: false,
  loading: () => <></>,
})

interface ImageVideoAssetOverlayProps {
  videoUrl: string,
  spotColor?: string
}

function ImageVideoAssetOverlay(props: ImageVideoAssetOverlayProps) {
  const { videoUrl, spotColor } = props || {}

  if (!videoUrl) return null
  return (
    <div>
      <VideoModal videoUrl={videoUrl} forceFullScreen>
        <PlayButton spotColor={spotColor} />
      </VideoModal>
    </div>
  );
}

export default ImageVideoAssetOverlay;