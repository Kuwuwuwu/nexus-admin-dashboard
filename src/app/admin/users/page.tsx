'use client'

import React, { useOptimistic, useTransition } from 'react'
import { checkRole } from '@/lib/check-role'
import { getUsers, updateUserRole } from '@/app/actions/user-actions'
import { Users, ChevronDown } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { useOptimistic, startTransition } from 'react'

// Server-side role check
async function AdminUsersPage() {
  // Ensure only ADMIN users can access this page
  const isAdminUser = await checkRole('ADMIN')

  if (!isAdminUser) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Access Denied</h2>
          <p className="text-red-600">You need ADMIN role to access this page.</p>
        </div>
      </div>
    )
  }

  // Fetch users from database
  const users = await getUsers()

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Users className="h-8 w-8" />
          User Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage user roles and permissions
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
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
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-700">
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminUsersPage

function UserRow({ user }: { user: any }) {
  const [optimisticUser, setOptimisticUser] = useOptimistic(user, {
    userId: user.id,
    role: user.role,
  })

  const [isPending, startTransition] = useTransition()

  const handleRoleChange = (newRole: 'USER' | 'ADMIN' | 'MODERATOR') => {
    startTransition(() => {
      setOptimisticUser({ userId: user.id, role: newRole } as any)
      updateUserRole(user.id, newRole)
    })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'MODERATOR':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'USER':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {optimisticUser.role !== user.role ? (
            <span className="opacity-50">{user.name}</span>
          ) : (
            user.name
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {user.email}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">
          {optimisticUser.role !== user.role ? (
            <span className="animate-pulse">Updating...</span>
          ) : (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                optimisticUser.role
              )}`}
            >
              {optimisticUser.role}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {user.joinedDate}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <RoleDropdown
          currentRole={optimisticUser.role}
          onRoleChange={handleRoleChange}
          isPending={isPending}
          disabled={optimisticUser.role !== user.role}
        />
      </td>
    </tr>
  )
}

function RoleDropdown({
  currentRole,
  onRoleChange,
  isPending,
  disabled,
}: {
  currentRole: string
  onRoleChange: (role: 'USER' | 'ADMIN' | 'MODERATOR') => void
  isPending: boolean
  disabled?: boolean
}) {
  const roles = ['USER', 'MODERATOR', 'ADMIN'] as const

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled || isPending}
          className="flex items-center gap-2"
        >
          {currentRole}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {roles.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => onRoleChange(role)}
            className={`${role === currentRole ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
