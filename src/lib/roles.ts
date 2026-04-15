export enum Role {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  PREMIUM = 'PREMIUM'
}

export interface UserRole {
  role: Role;
}

/**
 * Server-side utility function to check if user has specific role
 * @param user - User object with role property
 * @param requiredRole - Required role to check against
 * @returns boolean indicating if user has required role or higher privilege
 */
export function checkRole(user: UserRole | null, requiredRole: Role): boolean {
  if (!user) return false;
  
  const roleHierarchy = {
    [Role.USER]: 1,
    [Role.MODERATOR]: 2,
    [Role.PREMIUM]: 3,
    [Role.ADMIN]: 4
  };
  
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

/**
 * Check if user is an admin
 * @param user - User object with role property
 * @returns boolean indicating if user is admin
 */
export function isAdmin(user: UserRole | null): boolean {
  return checkRole(user, Role.ADMIN);
}

/**
 * Check if user is a moderator or higher
 * @param user - User object with role property
 * @returns boolean indicating if user is moderator or admin
 */
export function isModerator(user: UserRole | null): boolean {
  return checkRole(user, Role.MODERATOR);
}

/**
 * Check if user has premium access
 * @param user - User object with role property
 * @returns boolean indicating if user is premium or admin
 */
export function isPremium(user: UserRole | null): boolean {
  if (!user) return false;
  return user.role === Role.PREMIUM || user.role === Role.ADMIN;
}

/**
 * Get user role from Clerk metadata or session
 * @param auth - Clerk auth object
 * @returns User role or null if not found
 */
export function getUserRole(auth: any): Role | null {
  const metadata = auth?.sessionClaims?.metadata || auth?.publicMetadata;
  return metadata?.role || null;
}
