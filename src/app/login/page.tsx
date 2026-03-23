'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to Clerk sign-in page
    router.push('/sign-in')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020617] px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Redirecting to Sign In
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we redirect you to the secure sign-in page...
            </p>
          </div>

          <div className="animate-pulse">
            <ArrowRight className="h-6 w-6 text-blue-600 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
