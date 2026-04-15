'use client'

import { Activity, UserPlus, UserMinus, UserCog, Clock } from 'lucide-react'
import { ActivityLog } from '@/app/actions/activity-actions'

interface RecentActivityProps {
  activities: ActivityLog[]
}

// Helper function to format time ago
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) {
    return 'just now'
  } else if (diffMins < 60) {
    return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString()
  }
}

// Get icon based on action type
function getActionIcon(action: string) {
  switch (action.toLowerCase()) {
    case 'created user':
    case 'added user':
      return UserPlus
    case 'deleted user':
    case 'removed user':
      return UserMinus
    case 'changed role':
    case 'updated role':
      return UserCog
    default:
      return Activity
  }
}

// Get color based on action type
function getActionColor(action: string): string {
  switch (action.toLowerCase()) {
    case 'created user':
    case 'added user':
      return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
    case 'deleted user':
    case 'removed user':
      return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
    case 'changed role':
    case 'updated role':
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400'
  }
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No recent activity to display
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5" />
        Recent Activity
      </h3>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActionIcon(activity.action)
          const iconColorClass = getActionColor(activity.action)
          const timeAgo = formatTimeAgo(activity.createdAt)

          return (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${iconColorClass}`}>
                <Icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.action}</span>
                  <span className="text-gray-600 dark:text-gray-400">: {activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {timeAgo}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Showing last {activities.length} activities
        </p>
      </div>
    </div>
  )
}
