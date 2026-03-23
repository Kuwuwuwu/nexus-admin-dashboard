'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider 
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL!}
      afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL!}
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL!}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL!}
    >
      {children}
    </ClerkProvider>
  )
}
