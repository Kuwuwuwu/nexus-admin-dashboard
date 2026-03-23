'use client'

import { useState } from 'react'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020617] px-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Sign In Form */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in to your admin dashboard
            </p>
          </div>

          <SignIn
            path="/sign-in"
            routing="path"
            forceRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
            signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
            appearance={{
              elements: {
                formButton: {
                  className: 'w-full bg-blue-600 hover:bg-blue-700 text-white'
                },
                socialButtonsBlockButton: {
                  className: 'w-full bg-gray-100 hover:bg-gray-200 text-gray-900'
                },
                socialButtonsBlock: {
                  className: 'flex gap-2'
                },
                socialButtonsIconButton: {
                  className: 'flex-1'
                },
                socialButtonsProviderIcon: {
                  className: 'h-5 w-5'
                },
                card: 'bg-white dark:bg-slate-900 shadow-xl',
                headerTitle: 'text-gray-900 dark:text-white',
                headerSubtitle: 'text-gray-600 dark:text-gray-400',
                formFieldLabel: 'text-gray-700 dark:text-gray-300',
                formFieldInput: 'bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white',
                footerActionLink: 'text-blue-600 hover:text-blue-500',
                footerAction: 'text-center'
              }
            }}
          />

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                href="/sign-up"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
