'use client'

import { useAuth } from '@clerk/nextjs'
import { AccessDenied } from './AccessDenied'
import { usePathname } from 'next/navigation'

interface RoleGuardProps {
  children: React.ReactNode
  requiredRole?: 'ADMIN' | 'MODERATOR' | 'USER'
  fallback?: React.ReactNode
}

export function RoleGuard({
  children,
  requiredRole,
  fallback
}: RoleGuardProps) {
  const { isSignedIn, sessionClaims } = useAuth()
  const pathname = usePathname()

  // Check if user is on admin route
  const isAdminRoute = pathname?.startsWith('/admin')

  // If not admin route, don't apply role guard
  if (!isAdminRoute) {
    return <>{children}</>
  }

  // If not signed in, show access denied
  if (!isSignedIn) {
    return fallback || <AccessDenied message="Please sign in to access this page." />
  }

  // If no specific role required, just check if signed in
  if (!requiredRole) {
    return <>{children}</>
  }

  // Check user's role from sessionClaims metadata
  const userRole = (sessionClaims as any)?.metadata?.role

  // If user doesn't have required role, show access denied
  if (userRole !== requiredRole) {
    return fallback || <AccessDenied message={`You need ${requiredRole} role to access this page. Current role: ${userRole || 'None'}`} />
  }

  // User has required role, render children
  return <>{children}</>
}

// Specific guard components for convenience
export function AdminGuard({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <RoleGuard requiredRole="ADMIN" fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

export function ModeratorGuard({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <RoleGuard requiredRole="MODERATOR" fallback={fallback}>
      {children}
    </RoleGuard>
  )
}
