import { getCurrentUser } from '@/lib/auth-utils'
import { checkRole } from '@/lib/check-role'
import {
  Users,
  UserCog,
  UserPlus,
  TrendingUp,
  ArrowRight,
  Calendar
} from 'lucide-react'
import { AnalyticsCard } from '@/app/components/AnalyticsCard'
import { RoleDistributionChart } from '@/app/components/RoleDistributionChart'
import { getAnalyticsData } from '@/app/actions/analytics-actions'
import { getRecentActivities } from '@/app/actions/activity-actions'
import { Card } from '@/app/components/ui/card'
import { RecentActivity } from '@/app/components/RecentActivity'
import Link from 'next/link'

export default async function AdminPage() {
  // Server-side role check for extra security
  const isAdmin = await checkRole('ADMIN')

  if (!isAdmin) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <h2 className="text-red-800 dark:text-red-200 font-semibold text-xl mb-2">
            Access Denied
          </h2>
          <p className="text-red-600 dark:text-red-400">
            You need ADMIN role to access this dashboard.
          </p>
        </div>
      </div>
    )
  }

  const user = await getCurrentUser()
  const analytics = await getAnalyticsData()
  const recentActivities = await getRecentActivities(5)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Welcome back, Admin. Here&apos;s what&apos;s happening in your system.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analytics.totalUsers}
          icon={Users}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <AnalyticsCard
          title="Active Admins"
          value={analytics.activeAdmins}
          icon={UserCog}
          color="red"
        />
        <AnalyticsCard
          title="New Users (7 days)"
          value={analytics.newUsersLast7Days}
          icon={UserPlus}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Charts and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Role Distribution Chart */}
        <div className="lg:col-span-2">
          <RoleDistributionChart data={analytics.roleDistribution} />
        </div>

        {/* Recent Activity */}
        <RecentActivity activities={recentActivities} />
      </div>

      {/* Quick Actions and Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Quick Actions */}
        <Card className="p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/admin/users"
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Manage Users</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View and edit user roles</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </Link>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">System Health</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">All systems operational</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Last Updated</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Users Table */}
      <Card className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Users
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {analytics.recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'ADMIN'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : user.role === 'MODERATOR'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user.joinedDate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
