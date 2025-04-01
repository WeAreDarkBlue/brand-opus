import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { SheetProvider } from '@/lib/theatre'

// import { FlowmapProvider } from '../flowmap'
import { Preload } from '../preload'
import { RAF } from '../raf'
import { useCanvas } from '.'
import s from './webgl.module.scss'

export function WebGLCanvas({ render = true, ...props }) {
  const { WebGLTunnel, DOMTunnel } = useCanvas()

  return (
    <div className={s.webgl} {...props}>
      <Canvas
        gl={{
          precision: 'highp',
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true,
          // stencil: false,
          // depth: false,
        }}
        dpr={[1, 2]}
        orthographic
        camera={{ zoom: 50, position: [0, 0, 100] }}
        frameloop="never"
        linear
        flat
        eventSource={document.documentElement}
        eventPrefix="client"
      >
        {/* <StateListener onChange={onChange} /> */}
        <ambientLight intensity={Math.PI} />
        <SheetProvider id="webgl">
          <OrthographicCamera
            makeDefault
            position={[0, 0, 100]}
            near={0.001}
            far={10000}
            zoom={50}
          />
          <RAF render={render} />
          {/* <FlowmapProvider>
          </FlowmapProvider> */}
          {/* <PostProcessing /> */}
          <WebGLTunnel.Out />
          <Preload />
        </SheetProvider>
      </Canvas>
      <DOMTunnel.Out />
    </div>
  )
}
