'use client'

import { useContextBridge } from '@react-three/drei'
import { Fragment, useId } from 'react'

import { TransformContext } from '@/lib/hooks/use-transform'
import { useCanvas } from '@/lib/webgl/components/canvas'

export function WebGLTunnel({ children }) {
  const { WebGLTunnel } = useCanvas()

  const ContextBridge = useContextBridge(TransformContext)

  const uuid = useId()

  if (!WebGLTunnel) return

  return (
    <WebGLTunnel.In>
      <ContextBridge key={uuid}>{children}</ContextBridge>
    </WebGLTunnel.In>
  )
}

export function DOMTunnel({ children }) {
  const { DOMTunnel } = useCanvas()

  const uuid = useId()

  return (
    <DOMTunnel.In>
      <Fragment key={uuid}>{children}</Fragment>
    </DOMTunnel.In>
  )
}
