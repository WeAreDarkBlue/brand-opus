import ImageVideoAsset from '../common/ImageVideoAsset'

function FullWidthAsset({ data }) {
  const { description, asset, spotColor } = data || {}

  return (
    <section>
      <div className={`${asset.imageDesktop ? 'aspect-auto h-full w-full':'aspect-video lg:max-h-[900px] lg:h-[90vh]'} relative w-screen -ml-5 lg:-ml-0 lg:w-full bg-black overflow-hidden`}>
        <ImageVideoAsset
          fill
          loop
          priority
          playsinline
          autoPlay
          asset={asset}
          sizes="100vw"
          spotColor={spotColor}
          className={`${asset.imageDesktop ? '':'absolute inset-0'}`}
        />
      </div>
      {description && (
        <div className="block-container mt-6 lg:mt-10">
          <div className="col-span-3 lg:col-span-10">
            <p className="font-semibold text-sm lg:text-lg">{description}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default FullWidthAsset
