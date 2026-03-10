'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { User, Mail, Shield, Bell, Sun, Moon, Monitor, Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [displayName, setDisplayName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [jobTitle, setJobTitle] = useState('Product Manager')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [productUpdates, setProductUpdates] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const themeOptions = [
    { name: 'Light', icon: Sun, value: 'light' },
    { name: 'Dark', icon: Moon, value: 'dark' },
    { name: 'System', icon: Monitor, value: 'system' },
  ]

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)


    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Settings saved:', {
        displayName,
        email,
        jobTitle,
        twoFactorEnabled,
        emailNotifications,
        productUpdates,
        securityAlerts,
        theme
      })
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-500 dark:text-slate-400">Loading...</div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSaveChanges}>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your account settings and preferences.</p>
        </div>

        {/* Profile Details Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Profile Details</h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="relative">
              <div className="relative h-24 w-24 rounded-full overflow-hidden">
                <Image
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe"
                  alt="User Avatar"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer" title="Change Avatar">
                <User className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <Button variant="default" className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600">
                Change Avatar
              </Button>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Display Name
              </label>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Job Title
              </label>
              <Input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Security & Privacy Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Security & Privacy</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Current Password
                </label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  New Password
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Add an extra layer of security</p>
                </div>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactorEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                title={twoFactorEnabled ? 'Disable Two-Factor Authentication' : 'Enable Two-Factor Authentication'}
                aria-label={twoFactorEnabled ? 'Disable Two-Factor Authentication' : 'Enable Two-Factor Authentication'}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* App Preferences Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">App Preferences</h2>

          <div className="space-y-4">
            {themeOptions.map((option) => {
              const Icon = option.icon
              const isActive = theme === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${isActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive
                      ? 'bg-blue-100 dark:bg-blue-900/50'
                      : 'bg-slate-100 dark:bg-slate-700'
                      }`}>
                      <Icon className={`h-5 w-5 ${isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400'
                        }`} />
                    </div>
                    <div className="text-left">
                      <p className={`font-medium ${isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-white'
                        }`}>
                        {option.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {option.value === 'system'
                          ? 'Use your system preference'
                          : `Use ${option.name.toLowerCase()} theme`
                        }
                      </p>
                    </div>
                  </div>
                  {isActive && (
                    <div className="p-1 bg-blue-600 rounded-full">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Notifications</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Receive updates via email</p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifications ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                title={emailNotifications ? 'Disable Email Notifications' : 'Enable Email Notifications'}
                aria-label={emailNotifications ? 'Disable Email Notifications' : 'Enable Email Notifications'}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Product Updates</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">New features and improvements</p>
                </div>
              </div>
              <button
                onClick={() => setProductUpdates(!productUpdates)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${productUpdates ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                title={productUpdates ? 'Disable Product Updates' : 'Enable Product Updates'}
                aria-label={productUpdates ? 'Disable Product Updates' : 'Enable Product Updates'}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${productUpdates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Security Alerts</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Important security notifications</p>
                </div>
              </div>
              <button
                onClick={() => setSecurityAlerts(!securityAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securityAlerts ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                title={securityAlerts ? 'Disable Security Alerts' : 'Enable Security Alerts'}
                aria-label={securityAlerts ? 'Disable Security Alerts' : 'Enable Security Alerts'}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${securityAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="flex-1 h-12 border-slate-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  )
}
