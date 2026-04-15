'use client'

import { useOptimistic, useTransition, useEffect, useState } from 'react'
import { getUsers, updateUserRole } from '@/app/actions/user-actions'
import { Users, ChevronDown } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'

interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN' | 'MODERATOR'
  joinedDate: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers()
        setUsers(data as User[])
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Users className="h-6 w-6 md:h-8 md:w-8" />
          User Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Manage user roles and permissions
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white dark:bg-slate-900 rounded-lg shadow overflow-hidden">
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
        </>
      )}
    </div>
  )
}

function UserCard({ user }: { user: User }) {
  const [optimisticUser, setOptimisticUser] = useOptimistic(
    user,
    (state, newRole: 'USER' | 'ADMIN' | 'MODERATOR') => ({ ...state, role: newRole })
  )
  const [isPending, startTransition] = useTransition()

  const handleRoleChange = (newRole: 'USER' | 'ADMIN' | 'MODERATOR') => {
    startTransition(() => {
      setOptimisticUser(newRole)
      updateUserRole(user.id, newRole)
    })
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-4 border border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
        <RoleBadge role={optimisticUser.role} isPending={isPending} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">{user.joinedDate}</span>
        <RoleDropdown
          currentRole={optimisticUser.role}
          onRoleChange={handleRoleChange}
          isPending={isPending}
          disabled={isPending}
        />
      </div>
    </div>
  )
}

function UserRow({ user }: { user: User }) {
  const [optimisticUser, setOptimisticUser] = useOptimistic(
    user,
    (state, newRole: 'USER' | 'ADMIN' | 'MODERATOR') => ({ ...state, role: newRole })
  )
  const [isPending, startTransition] = useTransition()

  const handleRoleChange = (newRole: 'USER' | 'ADMIN' | 'MODERATOR') => {
    startTransition(() => {
      setOptimisticUser(newRole)
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

function RoleBadge({ role, isPending }: { role: string; isPending: boolean }) {
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

  if (isPending) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium animate-pulse text-gray-500">
        Updating...
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(role)}`}>
      {role}
    </span>
  )
}
