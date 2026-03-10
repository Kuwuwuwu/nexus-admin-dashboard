import Image from 'next/image'
import { Users, Mail, Shield, MoreHorizontal, Plus, X, UserPlus, Crown } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { supabase } from '../../lib/supabase'

export const dynamic = 'force-dynamic'

async function getTeamMembers() {
  const { data, error } = await supabase
    .from('team')
    .select('*')
    .order('created_at', { ascending: false })

  console.log('Fetched team data:', data, 'Error:', error)

  if (error) {
    console.error('Error fetching team members:', error)
    return []
  }

  return data || []
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  const getRoleIcon = (role: string) => {
    return role === 'Admin' ? (
      <Crown className="h-4 w-4 text-amber-500" />
    ) : (
      <Shield className="h-4 w-4 text-slate-500" />
    )
  }

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
        <div className="h-2 w-2 bg-emerald-500 rounded-full" />
        Active
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
        <div className="h-2 w-2 bg-amber-500 rounded-full" />
        Pending
      </span>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your team members and permissions.</p>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Team Members
          </h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            ({teamMembers.length} total)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Role
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {member.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(member.role)}
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.role}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
