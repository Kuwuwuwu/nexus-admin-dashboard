'use server'

import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

// Lazy initialization
let stripe: Stripe | null = null

function getStripe() {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-03-25.dahlia',
    })
  }
  return stripe
}

/**
 * Create a Stripe Billing Portal session
 * This allows users to manage their subscription without custom UI
 */
export async function createBillingPortalSession() {
  try {
    // Get current user from Clerk
    const authResult = await auth()
    const userId = authResult.userId

    if (!userId) {
      throw new Error('User not authenticated')
    }

    // TODO: Fetch user's stripeCustomerId from database
    // const user = await prisma.user.findUnique({
    //   where: { id: userId },
    //   select: { stripeCustomerId: true, email: true }
    // })

    // For now, we'll create a new customer if not exists
    // In production, you should store the customer ID after first payment
    
    // Mock implementation - replace with actual database lookup
    const stripeCustomerId = null // This should come from your database

    if (!stripeCustomerId) {
      throw new Error('No Stripe customer found. Please subscribe first.')
    }

    // Create billing portal session
    const session = await getStripe().billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
    })

    console.log(`[Stripe] Billing portal session created: ${session.id}`)

    // Redirect to Stripe Billing Portal
    redirect(session.url)

  } catch (error: any) {
    console.error('[Stripe] Error creating billing portal session:', error)
    throw new Error(error.message || 'Failed to create billing portal session')
  }
}

/**
 * Create a checkout session for new subscriptions
 */
export async function createCheckoutSession(priceId: string) {
  try {
    const authResult = await auth()
    const userId = authResult.userId

    if (!userId) {
      throw new Error('User not authenticated')
    }

    // Get user email from Clerk
    // This is simplified - in production get from Clerk or your database
    
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
      // TODO: Add client_reference_id to link with your user ID
      // client_reference_id: userId,
    })

    console.log(`[Stripe] Checkout session created: ${session.id}`)

    return { sessionId: session.id, url: session.url }

  } catch (error: any) {
    console.error('[Stripe] Error creating checkout session:', error)
    throw new Error(error.message || 'Failed to create checkout session')
  }
}

/**
 * Check if user has PREMIUM role
 */
export async function checkPremiumAccess(): Promise<boolean> {
  try {
    const authResult = await auth()
    
    if (!authResult.userId) {
      return false
    }

    // Check publicMetadata for PREMIUM role
    const role = (authResult as any).publicMetadata?.role
    
    return role === 'PREMIUM'

  } catch (error) {
    console.error('[Stripe] Error checking premium access:', error)
    return false
  }
}

/**
 * Get user's subscription status
 */
export async function getSubscriptionStatus() {
  try {
    const authResult = await auth()
    
    if (!authResult.userId) {
      return { isPremium: false, status: 'none' }
    }

    const metadata = (authResult as any).publicMetadata
    
    return {
      isPremium: metadata?.role === 'PREMIUM',
      status: metadata?.subscriptionStatus || 'none',
      stripeCustomerId: metadata?.stripeCustomerId || null
    }

  } catch (error) {
    console.error('[Stripe] Error getting subscription status:', error)
    return { isPremium: false, status: 'error' }
  }
}
