import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

import SalesforceFormController from '@/components/common/Salesforce/FormController'
import BlockRenderer from '@/components/core/BlockRenderer/BlockRenderer'
import type { HomePagePayload } from '@/types'

import Intro from './Intro'
import Hero from './Hero'
import { Canvas } from '@/lib/webgl/components/canvas'
import ThemeSetter from '@/components/core/ThemeSetter'
import {stegaClean} from "@sanity/client/stega"
import { getLocaleEmoji } from '@/lib/utils'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
  country: string
}

export function HomePage({
  data,
  encodeDataAttribute,
  country,
}: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  let { intro = [], headline, blocks = [], themeColor, navTheme, hero } = data ?? {}
  themeColor = stegaClean(themeColor)
  navTheme = stegaClean(navTheme)
  return (
    <>
      <Canvas root />
      <ThemeSetter theme={themeColor} navTheme={navTheme} />
      <div
        className={`${themeColor === 'dark' ? 'theme-dark' : 'theme-light'} bg-theme-bg text-theme-text`}
      >
        {/* Locale Indicator */}
        { process.env.PRE_PRODUCTION === "1" && (
          <div className="absolute top-10 right-10 z-50 text-3xl pointer-events-none">
            { getLocaleEmoji(country) }
          </div>
        )}
        {/* Hero */}
        { hero && <Hero data={hero} /> }

        {/* Intro */}
        { headline && intro && <Intro title={headline} description={intro} /> }

        {/* Blocks */}
        {blocks && <BlockRenderer blocks={blocks} country={country} />}
      </div>
    </>
  )
}

export default HomePage
