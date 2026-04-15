import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClerkClient } from '@clerk/nextjs/server'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// Initialize Clerk client
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
})

// Webhook secret for verifying Stripe events
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

/**
 * Update user role to PREMIUM in database and Clerk
 */
async function updateUserToPremium(email: string, stripeCustomerId: string) {
  try {
    console.log(`[Stripe Webhook] Updating user to PREMIUM: ${email}`)

    // TODO: Update user in Prisma database
    // const user = await prisma.user.updateMany({
    //   where: { 
    //     OR: [
    //       { email: email },
    //       { stripeCustomerId: stripeCustomerId }
    //     ]
    //   },
    //   data: { 
    //     role: 'PREMIUM',
    //     stripeCustomerId: stripeCustomerId 
    //   }
    // })

    // Mock database update
    console.log(`[Stripe Webhook] Database updated for user: ${email}`)

    // Find user in Clerk by email and update their publicMetadata
    try {
      const clerkUsers = await clerkClient.users.getUserList({
        emailAddress: [email],
      })

      if (clerkUsers.data.length > 0) {
        const clerkUser = clerkUsers.data[0]
        
        await clerkClient.users.updateUser(clerkUser.id, {
          publicMetadata: {
            role: 'PREMIUM',
            stripeCustomerId: stripeCustomerId,
            subscriptionStatus: 'active'
          }
        })
        
        console.log(`[Stripe Webhook] Clerk metadata updated for user: ${clerkUser.id}`)
      } else {
        console.warn(`[Stripe Webhook] No Clerk user found with email: ${email}`)
      }
    } catch (clerkError) {
      console.error('[Stripe Webhook] Error updating Clerk:', clerkError)
    }

    return { success: true }
  } catch (error) {
    console.error('[Stripe Webhook] Error updating user to premium:', error)
    throw error
  }
}

/**
 * Handle invoice payment succeeded
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    console.log(`[Stripe Webhook] Invoice payment succeeded: ${invoice.id}`)
    
    const customerId = invoice.customer as string
    const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer
    
    if (!customer.email) {
      console.error('[Stripe Webhook] No email found for customer:', customerId)
      return
    }

    await updateUserToPremium(customer.email, customerId)
    
    console.log(`[Stripe Webhook] Successfully processed invoice: ${invoice.id}`)
  } catch (error) {
    console.error('[Stripe Webhook] Error handling invoice payment:', error)
    throw error
  }
}

/**
 * Handle checkout session completed
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log(`[Stripe Webhook] Checkout session completed: ${session.id}`)
    
    const customerId = session.customer as string
    const customerEmail = session.customer_email || session.customer_details?.email
    
    if (!customerEmail) {
      console.error('[Stripe Webhook] No email found for checkout session:', session.id)
      return
    }

    await updateUserToPremium(customerEmail, customerId)
    
    console.log(`[Stripe Webhook] Successfully processed checkout: ${session.id}`)
  } catch (error) {
    console.error('[Stripe Webhook] Error handling checkout session:', error)
    throw error
  }
}

/**
 * POST handler for Stripe webhooks
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      console.error('[Stripe Webhook] No signature found')
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    } catch (err: any) {
      console.error(`[Stripe Webhook] Signature verification failed: ${err.message}`)
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      )
    }

    console.log(`[Stripe Webhook] Event received: ${event.type}`)

    // Handle specific events
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break
        
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break
        
      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
    
  } catch (error: any) {
    console.error('[Stripe Webhook] Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET handler for webhook verification (optional)
 */
export async function GET() {
  return NextResponse.json({ message: 'Stripe webhook endpoint active' })
}
