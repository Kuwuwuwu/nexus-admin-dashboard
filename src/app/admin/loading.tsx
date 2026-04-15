import { Skeleton } from '@/app/components/ui/skeleton'

// Analytics Card Skeleton
function AnalyticsCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>
    </div>
  )
}

// Chart Skeleton
function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
      <Skeleton className="h-6 w-40 mb-6" />
      <div className="h-64 flex items-end justify-center gap-8 px-4">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-32 w-12 rounded-t-lg" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-48 w-12 rounded-t-lg" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-24 w-12 rounded-t-lg" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}

// Activity Item Skeleton
function ActivityItemSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3">
      <Skeleton className="flex-shrink-0 h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  )
}

// Quick Action Skeleton
function QuickActionSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-800">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
      <Skeleton className="h-5 w-5" />
    </div>
  )
}

// Table Row Skeleton
function TableRowSkeleton() {
  return (
    <tr className="border-b border-gray-200 dark:border-slate-700">
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-48" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-24" />
      </td>
    </tr>
  )
}

export default function AdminLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>

      {/* Analytics Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnalyticsCardSkeleton />
        <AnalyticsCardSkeleton />
        <AnalyticsCardSkeleton />
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        
        {/* Recent Activity Skeleton */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-2">
            <ActivityItemSkeleton />
            <ActivityItemSkeleton />
            <ActivityItemSkeleton />
            <ActivityItemSkeleton />
            <ActivityItemSkeleton />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <Skeleton className="h-3 w-40 mx-auto" />
          </div>
        </div>
      </div>

      {/* Quick Actions and Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Quick Actions Skeleton */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            <QuickActionSkeleton />
            <QuickActionSkeleton />
            <QuickActionSkeleton />
          </div>
        </div>

        {/* Recent Users Table Skeleton */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3">
                    <Skeleton className="h-4 w-16" />
                  </th>
                  <th className="px-6 py-3">
                    <Skeleton className="h-4 w-16" />
                  </th>
                  <th className="px-6 py-3">
                    <Skeleton className="h-4 w-12" />
                  </th>
                  <th className="px-6 py-3">
                    <Skeleton className="h-4 w-16" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
