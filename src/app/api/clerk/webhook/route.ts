import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { Role } from '@/lib/roles'

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  if (!CLERK_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  const svix_id = req.headers.get('svix-id')
  const svix_timestamp = req.headers.get('svix-timestamp')
  const svix_signature = req.headers.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Missing svix headers' },
      { status: 400 }
    )
  }

  const body = await req.text()
  const wh = new Webhook(CLERK_WEBHOOK_SECRET)

  let event: any

  try {
    event = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook verification failed' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'user.created':
        await handleUserCreated(event.data)
        break
      case 'user.updated':
        await handleUserUpdated(event.data)
        break
      case 'session.created':
        await handleSessionCreated(event.data)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleUserCreated(userData: any) {
  // Set default role for new users
  const clerk = require('@clerk/nextjs/server').clerkBackendApi
  
  try {
    await clerk.users.updateUser(userData.id, {
      publicMetadata: {
        role: Role.USER
      }
    })
    
    // If you're using a database, you would also create the user record here
    // await prisma.user.create({
    //   data: {
    //     clerkId: userData.id,
    //     email: userData.email_addresses[0]?.email_address,
    //     role: Role.USER
    //   }
    // })
    
    console.log(`User ${userData.id} created with default role: ${Role.USER}`)
  } catch (error) {
    console.error('Error setting default user role:', error)
  }
}

async function handleUserUpdated(userData: any) {
  // Sync role changes from database to Clerk metadata if needed
  // This is useful if you update roles in your database separately
  console.log(`User ${userData.id} updated`)
}

async function handleSessionCreated(sessionData: any) {
  // You can perform additional actions when a user logs in
  console.log(`Session created for user: ${sessionData.user_id}`)
}
