'use client'

import './globals.css'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Menu,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  CreditCard,
  Users as TeamIcon,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { ThemeDropdown } from "./components/ui/theme-dropdown"
import { ThemeProvider } from "./components/ui/theme-provider"
import { MobileSidebar } from "./components/ui/mobile-sidebar"
import { useClickOutside } from "./hooks/use-click-outside"
import AIChat from "../components/AIChat"
import { ClerkProviderWrapper } from "./clerk-provider"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const profileDropdownRef = useClickOutside<HTMLDivElement>(() => setProfileDropdownOpen(false))
  const notificationsRef = useClickOutside<HTMLDivElement>(() => setNotificationsOpen(false))

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Users", href: "/users", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Team", href: "/team", icon: Users },
    { name: "Billing", href: "/billing", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <ClerkProviderWrapper>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased">
          <ThemeProvider>
            <div className="flex h-screen bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
              {/* Desktop Sidebar */}
              <aside
                className={`hidden lg:flex lg:flex-col ${sidebarOpen ? "w-64" : "w-20"
                  } bg-white dark:bg-[#0f172a] border-r border-gray-200 dark:border-slate-800 transition-all duration-300`}
              >
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-800">
                  {sidebarOpen && (
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">SaaS Admin</h1>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="hidden lg:flex"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(item.href)
                          ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {sidebarOpen && <span>{item.name}</span>}
                      </Link>
                    )
                  })}
                </nav>

                {/* Logout Button */}
                {sidebarOpen && (
                  <div className="px-3 pb-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 w-full"
                    >
                      <LogOut className="h-5 w-5 shrink-0" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </aside>

              {/* Main Content */}
              <div className="flex-1 flex flex-col overflow-hidden bg-[#F9FAFB] dark:bg-[#020617] transition-colors duration-300">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-6 transition-colors duration-300">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Mobile Menu Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileSidebarOpen(true)}
                      className="lg:hidden"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>

                    {/* Search */}
                    <div className="relative w-full max-w-xl">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-10 w-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 lg:gap-4">
                    {/* Theme Dropdown */}
                    <ThemeDropdown />

                    {/* Notifications */}
                    <div className="relative" ref={notificationsRef}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative min-h-[44px] min-w-[44px]"
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                      >
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                      </Button>

                      {notificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-slate-800 rounded-lg shadow-lg z-50 transition-colors duration-300">
                          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                          </div>
                          <div className="max-h-96 overflow-y-auto">
                            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                              <p className="text-sm text-gray-600 dark:text-gray-400">New user registration</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">2 minutes ago</p>
                            </div>
                            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                              <p className="text-sm text-gray-600 dark:text-gray-400">System update completed</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">1 hour ago</p>
                            </div>
                            <div className="p-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400">Monthly report ready</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">3 hours ago</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileDropdownRef}>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 min-h-[44px] px-3"
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <span className="hidden md:inline">Admin User</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>

                      {profileDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-slate-800 rounded-lg shadow-lg z-50 transition-colors duration-300">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <Link href="/profile" legacyBehavior passHref>
                            <DropdownMenuItem asChild>
                              <div className="flex flex-row items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer">
                                <User className="h-4 w-4 text-gray-600 dark:text-slate-400" />
                                <span className="text-gray-900 dark:text-white">Profile</span>
                              </div>
                            </DropdownMenuItem>
                          </Link>
                          <Link href="/billing" legacyBehavior passHref>
                            <DropdownMenuItem asChild>
                              <div className="flex flex-row items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer">
                                <CreditCard className="h-4 w-4 text-gray-600 dark:text-slate-400" />
                                <span className="text-gray-900 dark:text-white">Billing</span>
                              </div>
                            </DropdownMenuItem>
                          </Link>
                          <Link href="/team" legacyBehavior passHref>
                            <DropdownMenuItem asChild>
                              <div className="flex flex-row items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer">
                                <TeamIcon className="h-4 w-4 text-gray-600 dark:text-slate-400" />
                                <span className="text-gray-900 dark:text-white">Team</span>
                              </div>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <div className="flex flex-row items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer text-red-500">
                              <LogOut className="h-4 w-4" />
                              <span>Log out</span>
                            </div>
                          </DropdownMenuItem>
                        </div>
                      )}
                    </div>
                  </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                  {children}
                </main>
              </div>

              {/* Mobile Sidebar */}
              <MobileSidebar
                isOpen={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
              />

              {/* AI Chat */}
              <AIChat />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProviderWrapper>
  )
}
