'use server'

import { revalidatePath } from 'next/cache'

// Mock activity log data - replace with actual Prisma/Supabase queries
let mockActivityLog = [
  { id: '1', userId: 'user_admin_1', action: 'Changed role', target: 'Jane Smith to MODERATOR', createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
  { id: '2', userId: 'user_admin_1', action: 'Created user', target: 'David Brown', createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
  { id: '3', userId: 'user_admin_1', action: 'Changed role', target: 'Mike Johnson to ADMIN', createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
  { id: '4', userId: 'user_admin_2', action: 'Deleted user', target: 'Old Account', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
  { id: '5', userId: 'user_admin_1', action: 'Created user', target: 'Sarah Williams', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
]

export interface ActivityLog {
  id: string
  userId: string
  action: string
  target: string
  createdAt: string
}

/**
 * Log an activity to the database
 * @param userId - The ID of the user performing the action
 * @param action - The action performed (e.g., 'Changed role', 'Created user')
 * @param target - The target of the action (e.g., 'Jane Smith to MODERATOR')
 */
export async function logActivity(userId: string, action: string, target: string): Promise<void> {
  try {
    // In production, this would be:
    // await prisma.activityLog.create({
    //   data: {
    //     userId,
    //     action,
    //     target,
    //   }
    // })

    // Or for Supabase:
    // await supabase.from('activity_log').insert({
    //   user_id: userId,
    //   action,
    //   target,
    // })

    // Mock implementation
    const newActivity = {
      id: Date.now().toString(),
      userId,
      action,
      target,
      createdAt: new Date().toISOString(),
    }
    
    mockActivityLog.unshift(newActivity) // Add to beginning
    console.log(`Activity logged: ${action} - ${target} by ${userId}`)
    
  } catch (error) {
    console.error('Error logging activity:', error)
  }
}

/**
 * Get recent activities from the database
 * @param limit - Number of activities to fetch (default: 5)
 * @returns Array of recent activities
 */
export async function getRecentActivities(limit: number = 5): Promise<ActivityLog[]> {
  try {
    // In production, this would be:
    // const activities = await prisma.activityLog.findMany({
    //   orderBy: { createdAt: 'desc' },
    //   take: limit,
    // })
    // return activities

    // Or for Supabase:
    // const { data } = await supabase
    //   .from('activity_log')
    //   .select('*')
    //   .order('created_at', { ascending: false })
    //   .limit(limit)
    // return data || []

    // Mock implementation
    return mockActivityLog.slice(0, limit).map(activity => ({
      id: activity.id,
      userId: activity.userId,
      action: activity.action,
      target: activity.target,
      createdAt: activity.createdAt,
    }))

  } catch (error) {
    console.error('Error fetching recent activities:', error)
    return []
  }
}

/**
 * Get all activities with optional filtering
 * @param options - Filter options
 * @returns Array of activities
 */
export async function getAllActivities(options?: {
  userId?: string
  action?: string
  limit?: number
  offset?: number
}): Promise<ActivityLog[]> {
  try {
    let activities = [...mockActivityLog]

    if (options?.userId) {
      activities = activities.filter(a => a.userId === options.userId)
    }

    if (options?.action) {
      activities = activities.filter(a => a.action === options.action)
    }

    const offset = options?.offset || 0
    const limit = options?.limit || 10
    
    return activities.slice(offset, offset + limit).map(activity => ({
      id: activity.id,
      userId: activity.userId,
      action: activity.action,
      target: activity.target,
      createdAt: activity.createdAt,
    }))

  } catch (error) {
    console.error('Error fetching activities:', error)
    return []
  }
}

/**
 * Revalidate the admin dashboard after logging activity
 */
export async function revalidateDashboard(): Promise<void> {
  revalidatePath('/admin')
}
