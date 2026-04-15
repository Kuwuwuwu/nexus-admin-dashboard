import { auth } from '@clerk/nextjs/server'

/**
 * Check if the current user has a specific role
 * @param requiredRole - The role to check against ('ADMIN', 'USER', 'MODERATOR')
 * @returns Promise<boolean> - Whether the user has the required role
 */
export async function checkRole(requiredRole: 'ADMIN' | 'USER' | 'MODERATOR'): Promise<boolean> {
  try {
    const authResult = await auth()
    
    if (!authResult.userId) {
      return false // User is not authenticated
    }
    
    const userRole = (authResult as any).publicMetadata?.role
    
    return userRole === requiredRole
  } catch (error) {
    console.error('Error checking user role:', error)
    return false
  }
}

/**
 * Check if current user is an admin
 * @returns Promise<boolean> - Whether the user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  return checkRole('ADMIN')
}

/**
 * Check if current user is a moderator or higher
 * @returns Promise<boolean> - Whether the user is a moderator or admin
 */
export async function isModeratorOrHigher(): Promise<boolean> {
  try {
    const authResult = await auth()
    
    if (!authResult.userId) {
      return false
    }
    
    const userRole = (authResult as any).publicMetadata?.role
    
    return userRole === 'MODERATOR' || userRole === 'ADMIN'
  } catch (error) {
    console.error('Error checking user role:', error)
    return false
  }
}

/**
 * Get the current user's role
 * @returns Promise<string | null> - The user's role or null if not found
 */
export async function getCurrentUserRole(): Promise<string | null> {
  try {
    const authResult = await auth()
    
    if (!authResult.userId) {
      return null
    }
    
    return (authResult as any).publicMetadata?.role || null
  } catch (error) {
    console.error('Error getting current user role:', error)
    return null
  }
}

/**
 * Role hierarchy for checking higher-level permissions
 */
export const ROLE_HIERARCHY = {
  USER: 1,
  MODERATOR: 2,
  ADMIN: 3
} as const

/**
 * Check if user has at least the specified role level
 * @param minimumRole - The minimum role level required
 * @returns Promise<boolean> - Whether the user meets the minimum role requirement
 */
export async function hasMinimumRole(minimumRole: 'USER' | 'MODERATOR' | 'ADMIN'): Promise<boolean> {
  try {
    const authResult = await auth()
    
    if (!authResult.userId) {
      return false
    }
    
    const userRole = (authResult as any).publicMetadata?.role
    
    if (!userRole) {
      return false
    }
    
    return ROLE_HIERARCHY[userRole as keyof typeof ROLE_HIERARCHY] >= 
           ROLE_HIERARCHY[minimumRole]
  } catch (error) {
    console.error('Error checking minimum role:', error)
    return false
  }
}
