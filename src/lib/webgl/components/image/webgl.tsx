import { useRef, useState } from 'react'
import { LinearFilter, MeshBasicMaterial } from 'three'

import { useLenis } from '@/lib/lenis'
import { useTexture } from '@/lib/webgl/hooks/use-texture'
import { useWebGLRect } from '@/lib/webgl/hooks/use-webgl-rect'

export function WebGLImage({ src, rect }) {
  const meshRef = useRef()
  const [material] = useState(() => new MeshBasicMaterial())

  useTexture(src, (texture) => {
    texture.magFilter = texture.minFilter = LinearFilter
    texture.generateMipmaps = false

    material.map = texture
    material.needsUpdate = true
  })

  const getWebGLRect = useWebGLRect(rect)

  useLenis(() => {
    const { x, y, width, height } = getWebGLRect()

    meshRef.current.scale.set(width, height, width)
    meshRef.current.position.set(x, y, 0)

    meshRef.current.updateMatrix()
  }, [getWebGLRect])

  return (
    <mesh ref={meshRef} matrixAutoUpdate={false}>
      <planeGeometry />
      <primitive object={material} />
    </mesh>
  )
}
