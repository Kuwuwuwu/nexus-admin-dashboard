'use client'

import { Crown, ArrowRight, Sparkles, Lock } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

interface UpgradePlanCTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  featureName?: string
}

export function UpgradePlanCTA({
  title = "Premium Feature",
  description,
  buttonText = "Upgrade to Premium",
  buttonHref = "/billing",
  featureName
}: UpgradePlanCTAProps) {
  const defaultDescription = featureName 
    ? `Unlock ${featureName} and more advanced features with our Premium plan.`
    : "Unlock advanced analytics and premium features with our Premium plan."

  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-amber-950/30 dark:via-slate-900 dark:to-amber-950/30 p-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400 rounded-full blur-lg opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <Crown className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide">
              Premium Access Required
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-lg">
            {description || defaultDescription}
          </p>

          {/* Features list */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
            {[
              'Advanced Analytics',
              'Priority Support',
              'Unlimited Access',
              'Custom Reports'
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex-shrink-0">
          <Link href={buttonHref}>
            <Button 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 group px-6 py-6 text-lg"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom banner */}
      <div className="mt-6 pt-6 border-t border-amber-200/50 dark:border-amber-800/50">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Start your 14-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>
    </div>
  )
}

/**
 * Inline upgrade button for smaller UIs
 */
export function UpgradeButton({ 
  className = "" 
}: { 
  className?: string 
}) {
  return (
    <Link href="/billing">
      <Button 
        variant="outline" 
        className={`border-amber-500 text-amber-700 hover:bg-amber-50 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-950/30 ${className}`}
      >
        <Crown className="mr-2 h-4 w-4" />
        Upgrade
      </Button>
    </Link>
  )
}
