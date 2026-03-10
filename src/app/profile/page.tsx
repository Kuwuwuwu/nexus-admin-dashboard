'use client'

import { useState } from 'react'
import Image from 'next/image'
import { User, Mail, MapPin, Calendar, Edit3, Camera, Briefcase, Users, Heart, Settings } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useTheme } from 'next-themes'

export default function ProfilePage() {
  const { theme } = useTheme()
  const darkMode = theme === 'dark'
  const [isEditing, setIsEditing] = useState(false)

  const userStats = [
    { label: 'Projects', value: '12', icon: Briefcase, color: 'blue' },
    { label: 'Following', value: '45', icon: Users, color: 'emerald' },
    { label: 'Followers', value: '128', icon: Heart, color: 'red' },
    { label: 'Joined', value: 'Jan 2024', icon: Calendar, color: 'purple' },
  ]

  return (
    <div className="space-y-8">
      {/* Profile Header with Cover */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
              title="Change cover image"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Avatar and Basic Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
            {/* Avatar */}
            <div className="relative">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-900">
                <Image
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe"
                  alt="Profile Avatar"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <button className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg" title="Change avatar">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Name and Actions */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                John Doe
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                @johndoe
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Edit3 className="h-4 w-4" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 border-slate-200 dark:border-slate-700"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Profile Statistics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {userStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 ${stat.color === 'blue'
                  ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30'
                  : stat.color === 'emerald'
                    ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30'
                    : stat.color === 'red'
                      ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30'
                      : 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30'
                  }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon
                    className={`h-5 w-5 ${stat.color === 'blue'
                      ? 'text-blue-600 dark:text-blue-400'
                      : stat.color === 'emerald'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : stat.color === 'red'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-purple-600 dark:text-purple-400'
                      }`}
                  />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          About
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Bio
            </h3>
            {isEditing ? (
              <textarea
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white resize-none"
                rows={4}
                defaultValue="Passionate developer and designer with a love for creating beautiful user experiences. Always learning, always growing."
                placeholder="Tell us about yourself..."
                title="Bio"
              />
            ) : (
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Passionate developer and designer with a love for creating beautiful user experiences. Always learning, always growing.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Location
              </h3>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                {isEditing ? (
                  <input
                    type="text"
                    className="flex-1 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    defaultValue="San Francisco, CA"
                    placeholder="Enter your location"
                    title="Location"
                  />
                ) : (
                  <span className="text-slate-600 dark:text-slate-400">
                    San Francisco, CA
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </h3>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                {isEditing ? (
                  <input
                    type="email"
                    className="flex-1 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    defaultValue="john.doe@example.com"
                    placeholder="Enter your email"
                    title="Email"
                  />
                ) : (
                  <span className="text-slate-600 dark:text-slate-400">
                    john.doe@example.com
                  </span>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
