'use server'

// Mock analytics data - replace with actual Prisma queries
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'ADMIN', joinedDate: new Date('2024-01-15') },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'USER', joinedDate: new Date('2024-01-20') },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'MODERATOR', joinedDate: new Date('2024-02-01') },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'USER', joinedDate: new Date('2024-02-10') },
  { id: '5', name: 'David Brown', email: 'david@example.com', role: 'USER', joinedDate: new Date('2024-04-10') },
  { id: '6', name: 'Emily Davis', email: 'emily@example.com', role: 'MODERATOR', joinedDate: new Date('2024-04-12') },
  { id: '7', name: 'Alex Wilson', email: 'alex@example.com', role: 'ADMIN', joinedDate: new Date('2024-04-13') },
  { id: '8', name: 'Lisa Anderson', email: 'lisa@example.com', role: 'USER', joinedDate: new Date('2024-04-14') },
]

export interface AnalyticsData {
  totalUsers: number
  activeAdmins: number
  newUsersLast7Days: number
  roleDistribution: {
    name: string
    value: number
    color: string
  }[]
  recentUsers: {
    id: string
    name: string
    email: string
    role: string
    joinedDate: string
  }[]
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    // Fetch users from Prisma database (mock implementation)
    // const users = await prisma.user.findMany()
    const users = mockUsers

    // Calculate total users
    const totalUsers = users.length

    // Calculate active admins
    const activeAdmins = users.filter(user => user.role === 'ADMIN').length

    // Calculate new users in last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const newUsersLast7Days = users.filter(user => 
      new Date(user.joinedDate) >= sevenDaysAgo
    ).length

    // Calculate role distribution
    const roleCounts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const roleDistribution = [
      { name: 'Admin', value: roleCounts['ADMIN'] || 0, color: '#ef4444' },
      { name: 'Moderator', value: roleCounts['MODERATOR'] || 0, color: '#3b82f6' },
      { name: 'User', value: roleCounts['USER'] || 0, color: '#22c55e' },
    ]

    // Get recent users (last 5)
    const recentUsers = users
      .sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())
      .slice(0, 5)
      .map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        joinedDate: user.joinedDate.toISOString().split('T')[0]
      }))

    return {
      totalUsers,
      activeAdmins,
      newUsersLast7Days,
      roleDistribution,
      recentUsers
    }

  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return {
      totalUsers: 0,
      activeAdmins: 0,
      newUsersLast7Days: 0,
      roleDistribution: [],
      recentUsers: []
    }
  }
}
