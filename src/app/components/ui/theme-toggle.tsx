'use client'

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="w-10 h-10" />
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      {currentTheme === "dark" ? (
        <Moon className="h-5 w-5 text-blue-400 transition-all" />
      ) : (
        <Sun className="h-5 w-5 text-amber-500 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}