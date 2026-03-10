"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useClickOutside } from "../../hooks/use-click-outside";

export function ThemeDropdown() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleClickOutside = () => setOpen(false)
  const dropdownRef = useClickOutside<HTMLDivElement>(handleClickOutside)

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setOpen(false);
  };

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="relative" ref={dropdownRef}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="w-10 h-10" onClick={toggleDropdown}>
            {currentTheme === "dark" ? (
              <Moon className="h-5 w-5 text-blue-400" />
            ) : (
              <Sun className="h-5 w-5 text-amber-500" />
            )}
          </Button>
        </DropdownMenuTrigger>
        {open && (
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleThemeChange("light")} className="gap-2">
              <Sun className="h-4 w-4" /> Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange("dark")} className="gap-2">
              <Moon className="h-4 w-4" /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange("system")} className="gap-2">
              <Laptop className="h-4 w-4" /> System
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}