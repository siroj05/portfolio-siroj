'use client'

import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Waktu SSR & sebelum mount, render placeholder biar sama
    return (
      <button
        aria-label="Toggle Theme"
        className="rounded-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow transition-colors"
      >
        <Moon className="h-5 w-5 text-gray-800" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="rounded-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-800" />
      )}
    </button>
  )
}
