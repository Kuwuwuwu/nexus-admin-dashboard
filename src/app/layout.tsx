import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import ClientLayout from './client-layout'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Nexus Admin Dashboard',
  description: 'Modern SaaS Admin Dashboard with RBAC, AI, and Analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased">
          <ClientLayout>
            {children}
          </ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  )
}
