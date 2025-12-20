"use client"
import React from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') {
        document.documentElement.classList.add('dark')
        setIsDark(true)
        return
      }
      if (saved === 'light') {
        document.documentElement.classList.remove('dark')
        setIsDark(false)
        return
      }

      // No saved preference: follow system
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
        setIsDark(true)
      } else {
        document.documentElement.classList.remove('dark')
        setIsDark(false)
      }
    } catch (e) {
      // ignore (e.g., localStorage not available)
      setIsDark(false)
    }
  }, [])

  const toggle = React.useCallback(() => {
    try {
      const next = !isDark
      if (next) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      setIsDark(next)
    } catch (e) {
      // ignore
    }
  }, [isDark])

  return (
    <button
      aria-pressed={!!isDark}
      onClick={toggle}
      title="Toggle color mode"
      className="inline-flex items-center justify-center rounded-md p-2 border border-slate-200 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
    >
      {isDark ? (
        // sun icon when currently dark (click to switch to light)
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2" />
          <path d="M12 21v2" />
          <path d="M4.22 4.22l1.42 1.42" />
          <path d="M18.36 18.36l1.42 1.42" />
          <path d="M1 12h2" />
          <path d="M21 12h2" />
          <path d="M4.22 19.78l1.42-1.42" />
          <path d="M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        // moon icon when currently light (click to switch to dark)
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 dark:text-slate-100">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
