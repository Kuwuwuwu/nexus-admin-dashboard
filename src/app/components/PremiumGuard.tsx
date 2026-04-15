'use client'

import { useAuth } from '@clerk/nextjs'
import { UpgradePlanCTA } from './UpgradePlanCTA'

interface PremiumGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  featureName?: string
}

/**
 * Premium Guard - Protects premium content
 * If user doesn't have PREMIUM role, shows upgrade CTA
 */
export function PremiumGuard({ 
  children, 
  fallback,
  featureName = 'this feature'
}: PremiumGuardProps) {
  const { isSignedIn, sessionClaims } = useAuth()

  // If not signed in, show sign-in prompt
  if (!isSignedIn) {
    return fallback || (
      <UpgradePlanCTA 
        title="Sign In Required"
        description="Please sign in to access premium features."
        buttonText="Sign In"
        buttonHref="/sign-in"
      />
    )
  }

  // Check if user has PREMIUM role
  const userRole = (sessionClaims as any)?.metadata?.role
  const isPremium = userRole === 'PREMIUM'

  // If user is premium, show the content
  if (isPremium) {
    return <>{children}</>
  }

  // If user is not premium, show upgrade CTA
  return fallback || (
    <UpgradePlanCTA 
      featureName={featureName}
    />
  )
}

/**
 * Hook to check if current user has premium access
 */
export function usePremiumStatus(): { isPremium: boolean; isLoading: boolean } {
  const { isLoaded, isSignedIn, sessionClaims } = useAuth()
  
  if (!isLoaded) {
    return { isPremium: false, isLoading: true }
  }
  
  if (!isSignedIn) {
    return { isPremium: false, isLoading: false }
  }
  
  const userRole = (sessionClaims as any)?.metadata?.role
  return { isPremium: userRole === 'PREMIUM', isLoading: false }
}
