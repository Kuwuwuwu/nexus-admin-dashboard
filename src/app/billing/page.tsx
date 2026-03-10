'use client'

import { useState } from 'react'
import { CreditCard, DollarSign, Check, AlertCircle, Plus, Download, Edit3, TrendingUp, Users, Zap } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useTheme } from 'next-themes'

export default function BillingPage() {
  const { theme } = useTheme()
  const darkMode = theme === 'dark'

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'month',
      description: 'Perfect for individuals and small projects',
      features: [
        'Up to 3 team members',
        'Basic analytics',
        '1GB storage',
        'Community support'
      ],
      popular: false,
      current: true
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'month',
      description: 'Best for growing teams and businesses',
      features: [
        'Up to 10 team members',
        'Advanced analytics',
        '10GB storage',
        'Priority email support',
        'Custom integrations',
        'API access'
      ],
      popular: true,
      current: false
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'month',
      description: 'For large organizations with advanced needs',
      features: [
        'Unlimited team members',
        'Custom analytics',
        'Unlimited storage',
        '24/7 phone support',
        'Custom integrations',
        'Advanced API access',
        'Dedicated account manager',
        'SLA guarantee'
      ],
      popular: false,
      current: false
    }
  ]

  const billingHistory = [
    {
      id: 'INV-001',
      date: '2024-03-15',
      description: 'Pro Plan - Monthly Subscription',
      amount: '$29.00',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-002',
      date: '2024-02-15',
      description: 'Pro Plan - Monthly Subscription',
      amount: '$29.00',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-003',
      date: '2024-01-15',
      description: 'Pro Plan - Monthly Subscription',
      amount: '$29.00',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-004',
      date: '2024-01-01',
      description: 'Starter Plan - Setup Fee',
      amount: '$0.00',
      status: 'paid',
      downloadUrl: '#'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing & Subscriptions</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your subscription plan, payment methods, and billing history.</p>
      </div>

      {/* Pricing Plans */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Choose Your Plan</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-2xl border-2 transition-all ${plan.current
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                : plan.popular
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                })}

                  {plan.current && (
                    <div className="absolute -top-3 right-4">
                      <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                        Current Plan
                      </span>
                })}

                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          {plan.description}
                        </p>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            {plan.price}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 ml-2">
                            /{plan.period}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 dark:text-slate-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full ${plan.current
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          : plan.popular
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        disabled={plan.current}
                      >
                        {plan.current ? 'Current Plan' : plan.popular ? 'Upgrade to Pro' : 'Get Started'}
                      </Button>
                    </div>
                  ))}
                </div>
      </div>

      {/* Payment Method */ }
            < div className = "bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm" >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
          <Button variant="ghost" className="flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  •••• •••• •••• 4242
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Visa ending in 4242
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                <Check className="h-3 w-3 mr-1" />
                Default
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>

        {/* Billing History */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Billing History</h2>
            <Button variant="ghost" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {invoice.date}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      {invoice.description}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                      {invoice.amount}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                        <Check className="h-3 w-3" />
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={invoice.downloadUrl}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        {invoice.id}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )
}
