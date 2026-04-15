'use client'

import { Shield, Home, ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

interface AccessDeniedProps {
  message?: string
  showBackButton?: boolean
}

export function AccessDenied({ 
  message = "You don't have permission to access this page.", 
  showBackButton = true 
}: AccessDeniedProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020617] px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
          <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {message}
        </p>
        
        {showBackButton && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
