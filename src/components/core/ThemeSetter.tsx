'use client'
import { useEffect } from 'react'
import { create } from 'zustand'

interface ThemeState {
  theme: string
  navTheme: string
  toggleTheme: (color: string) => void
  toggleNavTheme: (color: string) => void
}

export const useThemeState = create<ThemeState>()((set) => ({
  theme: 'dark',
  navTheme: '',
  toggleTheme: (color) => set(() => ({ theme: color })),
  toggleNavTheme: (color) => set(() => ({ navTheme: color })),
}))

const ThemeSetter = ({theme, navTheme}) => {
  if (!navTheme) navTheme = theme === 'dark' ? 'light' : 'dark'
  const { toggleTheme, toggleNavTheme } = useThemeState()
  useEffect(() => {
    toggleTheme(theme)
    toggleNavTheme(navTheme)
  }, [theme, navTheme, toggleTheme, toggleNavTheme])
  return null
}

export default ThemeSetter
