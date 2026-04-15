import { Clerk } from '@clerk/types'

declare global {
  namespace Clerk {
    interface UserCustomMetadata {
      role?: 'ADMIN' | 'USER' | 'MODERATOR'
    }
    
    interface SessionClaims {
      metadata?: {
        role?: 'ADMIN' | 'USER' | 'MODERATOR'
      }
    }
  }
}

export {}
