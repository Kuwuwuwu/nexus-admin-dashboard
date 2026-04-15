import { NextRequest, NextResponse } from 'next/server'
import { createClerkClient } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'

// Lazy initialization
let clerkClient: ReturnType<typeof createClerkClient> | null = null

function getClerkClient() {
  if (!clerkClient) {
    clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    })
  }
  return clerkClient
}

// This webhook endpoint will be called when you want to sync roles from Prisma to Clerk
// You can trigger this manually or set up a database trigger

export async function POST(req: NextRequest) {
  try {
    const { userId, newRole } = await req.json()

    if (!userId || !newRole) {
      return NextResponse.json(
        { error: 'userId and newRole are required' },
        { status: 400 }
      )
    }

    // Validate role
    const validRoles = ['USER', 'ADMIN', 'MODERATOR']
    if (!validRoles.includes(newRole)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be USER, ADMIN, or MODERATOR' },
        { status: 400 }
      )
    }

    // Update Clerk user's publicMetadata with new role
    const updatedUser = await getClerkClient().users.updateUser(userId, {
      publicMetadata: {
        role: newRole
      }
    })

    console.log(`Role synced for user ${userId}: ${newRole}`)

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        role: updatedUser.publicMetadata?.role
      },
      message: 'Role synced successfully'
    })

  } catch (error) {
    console.error('Error syncing role:', error)
    return NextResponse.json(
      { error: 'Failed to sync role' },
      { status: 500 }
    )
  }
}

// GET endpoint to check current role from Clerk
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId parameter is required' },
        { status: 400 }
      )
    }

    const user = await getClerkClient().users.getUser(userId)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        role: user.publicMetadata?.role
      }
    })

  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
