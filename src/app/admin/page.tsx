import { getCurrentUser } from '@/lib/auth-utils'
import { Role } from '@/lib/roles'
import { Shield, Users, Settings, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/app/components/ui/card'

export default async function AdminPage() {
  const user = await getCurrentUser()

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to the admin control panel. Your role: {user.role}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <Users className="h-5 w-5" />
              User Management
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Manage user roles and permissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <BarChart3 className="h-5 w-5" />
              Analytics
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              View system analytics and reports
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <Settings className="h-5 w-5" />
              System Settings
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Configure system-wide settings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Role-based content example */}
      {user.role === Role.ADMIN && (
        <Card className="mt-6">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <Shield className="h-5 w-5" />
              Admin Only Section
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              This section is only visible to users with ADMIN role.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
