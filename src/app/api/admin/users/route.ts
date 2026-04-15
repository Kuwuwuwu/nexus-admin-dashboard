import { NextRequest, NextResponse } from 'next/server'
import { withRoleProtection } from '@/lib/auth-utils'
import { Role } from '@/lib/roles'

// Mock user data - replace with actual database queries
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: Role.ADMIN },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: Role.USER },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: Role.MODERATOR },
]

// GET /api/admin/users - Only admins can access
export const GET = withRoleProtection(async (req: Request, user: any) => {
  try {
    // Here you would typically fetch users from your database
    // const users = await prisma.user.findMany()
    
    return NextResponse.json({
      success: true,
      data: mockUsers,
      message: 'Users retrieved successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch users' 
      },
      { status: 500 }
    )
  }
}, Role.ADMIN)

// POST /api/admin/users - Only admins can create users
export const POST = withRoleProtection(async (req: Request, user: any) => {
  try {
    const body = await req.json()
    
    // Validate input
    if (!body.email || !body.name) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email and name are required' 
        },
        { status: 400 }
      )
    }
    
    // Here you would create a user in your database
    // const newUser = await prisma.user.create({
    //   data: {
    //     name: body.name,
    //     email: body.email,
    //     role: body.role || Role.USER
    //   }
    // })
    
    const newUser = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      role: body.role || Role.USER
    }
    
    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create user' 
      },
      { status: 500 }
    )
  }
}, Role.ADMIN)
