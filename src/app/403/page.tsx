import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020617] px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
          <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          403 Forbidden
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          You don&apos;t have permission to access this page. This area is restricted to administrators only.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <Link href="/sign-in">
            <Button variant="outline" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
