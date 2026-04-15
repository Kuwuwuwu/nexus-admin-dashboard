import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/chat(.*)',
])

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const authResult = await auth()
  
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!authResult.userId) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Protect admin routes - only users with ADMIN role allowed
  if (isAdminRoute(req)) {
    const userRole = (authResult as any).publicMetadata?.role
    
    if (userRole !== 'ADMIN') {
      // Redirect to home page instead of 403
      const homeUrl = new URL('/', req.url)
      return NextResponse.redirect(homeUrl)
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
