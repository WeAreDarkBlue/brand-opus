'use client'

import dynamic from 'next/dynamic'
import { createContext, useContext, useEffect, useState } from 'react'
import tunnel from 'tunnel-rat'
import { create } from 'zustand'

import { useDeviceDetection } from '@/lib/hooks/use-device-detection'

interface WebGLCanvasProps {
  children?: React.ReactNode
  root?: boolean
  force?: boolean
}

const WebGLCanvas = dynamic(
  () => import('./webgl').then(({ WebGLCanvas }) => WebGLCanvas),
  {
    ssr: false,
  },
)

const useRoot = create(() => ({}))

export const CanvasContext = createContext({})

export function Canvas({
  children,
  root = false,
  force = false,
  ...props
}: WebGLCanvasProps) {
  const [WebGLTunnel] = useState(() => tunnel())
  const [DOMTunnel] = useState(() => tunnel())

  const { isWebGL } = useDeviceDetection()

  useEffect(() => {
    if (root) {
      useRoot.setState(isWebGL || force ? { WebGLTunnel, DOMTunnel } : {})
    }

    return () => {
      useRoot.setState({})
    }
  }, [root, isWebGL, force, WebGLTunnel, DOMTunnel])

  return (
    <CanvasContext.Provider
      value={isWebGL || force ? { WebGLTunnel, DOMTunnel } : {}}
    >
      {(isWebGL || force) && <WebGLCanvas {...props} />}
      {children}
    </CanvasContext.Provider>
  )
}

export function useCanvas() {
  const local = useContext(CanvasContext)
  const root = useRoot()

  const isLocalDefined = Object.keys(local).length > 0

  return isLocalDefined ? local : root
}
