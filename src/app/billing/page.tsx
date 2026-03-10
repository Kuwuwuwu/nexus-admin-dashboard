'use client'

import { useState } from 'react'
import { CreditCard, DollarSign, Check, AlertCircle, Plus, Download } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useTheme } from 'next-themes'

export default function BillingPage() {
  const { theme } = useTheme()
  const darkMode = theme === 'dark'

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'month',
      features: [
        'Up to 3 team members',
        'Basic analytics',
        '1GB storage',
        'Email support'
      ],
      current: true
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'month',
      features: [
        'Up to 10 team members',
        'Advanced analytics',
        '10GB storage',
        'Priority email support',
        'Custom integrations'
      ],
      current: false
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'Unlimited team members',
        'Custom analytics',
        'Unlimited storage',
        '24/7 phone support',
        'Custom integrations',
        'Dedicated account manager'
      ],
      current: false
    }
  ]

  const billingHistory = [
    {
      id: 'INV-001',
      date: '2024-03-01',
      description: 'Pro Plan - Monthly',
      amount: '$29.00',
      status: 'paid'
    },
    {
      id: 'INV-002',
      date: '2024-02-01',
      description: 'Pro Plan - Monthly',
      amount: '$29.00',
      status: 'paid'
    },
    {
      id: 'INV-003',
      date: '2024-01-01',
      description: 'Pro Plan - Monthly',
      amount: '$29.00',
      status: 'paid'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your subscription and payment methods.</p>
      </div>

      {/* Subscription Plans */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Subscription Plan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-2xl border-2 transition-all ${
                plan.current
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
              }`}
            >
              {plan.current && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    Current Plan
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period !== 'contact us' && (
                    <span className="text-slate-500 dark:text-slate-400 ml-2">
                      /{plan.period}
                    </span>
                  )}
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
                className={`w-full ${
                  plan.current
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Payment Method</h2>
        
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                •••• •••• •••• 4242
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Expires 12/25
              </p>
            </div>
          </div>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
            Update
          </Button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Billing History
          </h2>
          <Button variant="ghost" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Invoice
                </th>
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
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {invoice.id}
                  </td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
