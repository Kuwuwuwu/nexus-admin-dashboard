'use server'

import { revalidatePath } from 'next/cache'
import { createClerkClient } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs/server'
import { logActivity } from './activity-actions'

// Initialize Clerk client
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
})

// Mock user data - replace with actual Prisma calls
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'ADMIN', joinedDate: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'USER', joinedDate: '2024-01-20' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'MODERATOR', joinedDate: '2024-02-01' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'USER', joinedDate: '2024-02-10' },
]

export async function updateUserRole(userId: string, newRole: 'USER' | 'ADMIN' | 'MODERATOR') {
  try {
    // Validate role
    const validRoles = ['USER', 'ADMIN', 'MODERATOR']
    if (!validRoles.includes(newRole)) {
      return {
        success: false,
        error: 'Invalid role'
      }
    }

    // Update user in Prisma database (mock implementation)
    // await prisma.user.update({
    //   where: { id: userId },
    //   data: { role: newRole }
    // })
    
    console.log(`Updated user ${userId} role to ${newRole} in database`)

    // Update user's publicMetadata in Clerk
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: newRole
      }
    })

    console.log(`Updated user ${userId} role to ${newRole} in Clerk`)

    // Get current admin user from session
    const authResult = await auth()
    const adminUserId = authResult.userId || 'unknown'
    
    // Find user name for better logging (in production, fetch from DB)
    const targetUser = mockUsers.find(u => u.id === userId)
    const targetUserName = targetUser?.name || userId

    // Log the activity
    await logActivity(
      adminUserId,
      'Changed role',
      `${targetUserName} to ${newRole}`
    )

    // Revalidate the admin users page and dashboard to refresh data
    revalidatePath('/admin/users')
    revalidatePath('/admin')

    return {
      success: true,
      message: `User role updated to ${newRole}`
    }

  } catch (error) {
    console.error('Error updating user role:', error)
    return {
      success: false,
      error: 'Failed to update user role'
    }
  }
}

export async function getUsers() {
  try {
    // Fetch users from Prisma database (mock implementation)
    // const users = await prisma.user.findMany({
    //   orderBy: { createdAt: 'desc' }
    // })
    
    return mockUsers

  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}
