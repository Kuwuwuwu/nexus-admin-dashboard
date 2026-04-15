import { Clerk } from '@clerk/types'

declare global {
  namespace Clerk {
    interface UserCustomMetadata {
      role?: 'ADMIN' | 'USER' | 'MODERATOR' | 'PREMIUM'
      stripeCustomerId?: string
      subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'none'
    }
    
    interface SessionClaims {
      metadata?: {
        role?: 'ADMIN' | 'USER' | 'MODERATOR' | 'PREMIUM'
        stripeCustomerId?: string
        subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'none'
      }
    }
  }
}

export {}
