'use client'

import 'lenis/dist/lenis.css'

import { ReactLenis, useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function Lenis({ root, options }) {
  const pathname = usePathname();

  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return (
    <ReactLenis
      root={root}
      options={{
        ...options,
        prevent: (node) => {
          return (
            node.nodeName === 'VERCEL-LIVE-FEEDBACK' ||
            node.id === 'theatrejs-studio-root'
          )
        },
      }}
    />
  )
}
