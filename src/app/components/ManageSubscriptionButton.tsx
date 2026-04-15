'use client'

import { useState } from 'react'
import { Settings, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { createBillingPortalSession } from '@/app/actions/stripe-actions'

export function ManageSubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleManageSubscription = async () => {
    setIsLoading(true)
    try {
      await createBillingPortalSession()
    } catch (error) {
      console.error('Error managing subscription:', error)
      alert('Failed to open billing portal. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleManageSubscription}
      disabled={isLoading}
      variant="outline"
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <Settings className="h-4 w-4" />
          Manage Subscription
        </>
      )}
    </Button>
  )
}

/**
 * Simpler version for inline use
 */
export function ManageSubscriptionLink({ 
  className = "" 
}: { 
  className?: string 
}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await createBillingPortalSession()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium ${className}`}
    >
      {isLoading ? 'Loading...' : 'Manage Subscription'}
    </button>
  )
}
