import { auth } from '@clerk/nextjs/server'
import { Role, checkRole, getUserRole } from './roles'

/**
 * Get current user with role from Clerk session
 * @returns User object with role or null if not authenticated
 */
export async function getCurrentUser() {
  const authResult = await auth()
  const { userId, sessionClaims } = authResult
  
  if (!userId) {
    return null
  }

  const role = getUserRole({ sessionClaims })
  
  return {
    id: userId,
    role: role || Role.USER, // Default to USER if no role found
    sessionClaims
  }
}

/**
 * Check if current user has required role
 * @param requiredRole - Minimum role required
 * @returns boolean indicating if user has required role
 */
export async function currentUserHasRole(requiredRole: Role): Promise<boolean> {
  const user = await getCurrentUser()
  return checkRole(user, requiredRole)
}

/**
 * Protect API routes with role-based access
 * @param requiredRole - Minimum role required to access the route
 * @returns User object if authorized, throws error if not
 */
export async function requireAuth(requiredRole: Role = Role.USER) {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  if (!checkRole(user, requiredRole)) {
    throw new Error(`Insufficient permissions. Required role: ${requiredRole}`)
  }
  
  return user
}

/**
 * Middleware helper for API routes
 * @param handler - API route handler function
 * @param requiredRole - Minimum role required
 * @returns Wrapped API handler with role checking
 */
export function withRoleProtection(
  handler: (req: Request, user: any) => Promise<Response>,
  requiredRole: Role = Role.USER
) {
  return async (req: Request) => {
    try {
      const user = await requireAuth(requiredRole)
      return await handler(req, user)
    } catch (error) {
      if (error instanceof Error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { 
            status: error.message.includes('Authentication') ? 401 : 403,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
      
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }
}
