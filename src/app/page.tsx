'use client'

import { useState, useEffect } from 'react'
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { DollarSign, Users, TrendingUp, Clock, ArrowUp, Plus, UserPlus, Settings } from "lucide-react";
import { useTheme } from "next-themes";

const data = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 2780 },
    { name: "May", revenue: 6890 },
    { name: "Jun", revenue: 7390 },
    { name: "Jul", revenue: 8490 },
    { name: "Aug", revenue: 9290 },
    { name: "Sep", revenue: 10590 },
    { name: "Oct", revenue: 11890 },
    { name: "Nov", revenue: 13290 },
    { name: "Dec", revenue: 14590 },
];

const userData = [
    { name: "Mon", active: 400, inactive: 240 },
    { name: "Tue", active: 300, inactive: 139 },
    { name: "Wed", active: 200, inactive: 980 },
    { name: "Thu", active: 278, inactive: 390 },
    { name: "Fri", active: 189, inactive: 480 },
    { name: "Sat", active: 239, inactive: 380 },
    { name: "Sun", active: 349, inactive: 430 },
];

const recentActivities = [
    {
        id: 1,
        description: "Upgraded to Pro plan",
        category: "upgrade",
        timestamp: "2 minutes ago",
        icon: ArrowUp,
        iconColor: "text-emerald-400"
    },
    {
        id: 2,
        description: "Created new project",
        category: "project",
        timestamp: "15 minutes ago",
        icon: Plus,
        iconColor: "text-blue-400"
    },
    {
        id: 3,
        description: "Invited team member",
        category: "invite",
        timestamp: "1 hour ago",
        icon: UserPlus,
        iconColor: "text-purple-400"
    },
    {
        id: 4,
        description: "Updated settings",
        category: "settings",
        timestamp: "3 hours ago",
        icon: Settings,
        iconColor: "text-orange-400"
    },
    {
        id: 5,
        description: "Upgraded to Pro plan",
        category: "upgrade",
        timestamp: "5 hours ago",
        icon: ArrowUp,
        iconColor: "text-emerald-400"
    }
];

const statsCards = [
    {
        title: "Total Revenue",
        value: "$72,548",
        change: "+12.5%",
        changeType: "positive" as const,
        icon: DollarSign,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600"
    },
    {
        title: "Active Users",
        value: "2,845",
        change: "+8.2%",
        changeType: "positive" as const,
        icon: Users,
        bgColor: "bg-green-100",
        iconColor: "text-green-600"
    },
    {
        title: "Conversions",
        value: "24.8%",
        change: "-2.1%",
        changeType: "negative" as const,
        icon: TrendingUp,
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600"
    },
    {
        title: "Avg. Session",
        value: "12m 34s",
        change: "+5.4%",
        changeType: "positive" as const,
        icon: Clock,
        bgColor: "bg-orange-100",
        iconColor: "text-orange-600"
    }
];

export default function DashboardPage() {
    const { theme } = useTheme();
    const darkMode = theme === 'dark';
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="space-y-6">
                {/* Page Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
                    <p className="text-slate-500 dark:text-slate-400">Here&apos;s what&apos;s happening with your SaaS platform today.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 dark:text-slate-400">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                                        <div className="flex items-center mt-2">
                                            <span className={`text-sm font-medium ${stat.changeType === 'positive'
                                                ? 'text-green-600 dark:text-emerald-400'
                                                : 'text-red-600 dark:text-red-400'
                                                }`}>
                                                {stat.change}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-slate-400 ml-2">
                                                from last month
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`p-3 rounded-full ${stat.bgColor} dark:bg-opacity-20`}>
                                        <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Chart Placeholders */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:backdrop-blur-sm p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm lg:col-span-2">
                        <h3 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">Revenue Overview</h3>
                        <div className="h-[300px] flex items-center justify-center">
                            <div className="text-slate-400">Loading chart...</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:backdrop-blur-sm p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">User Activity</h3>
                        <div className="h-[300px] flex items-center justify-center">
                            <div className="text-slate-400">Loading chart...</div>
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:backdrop-blur-sm p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">Recent Activities</h3>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => {
                            const Icon = activity.icon;
                            return (
                                <div key={activity.id} className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            <Icon className={`h-5 w-5 ${activity.iconColor}`} />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.description}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                                {activity.category}
                                            </span>
                                            <span className="text-xs text-slate-400">{activity.timestamp}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
                <p className="text-slate-500 dark:text-slate-400">Here&apos;s what&apos;s happening with your SaaS platform today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white dark:bg-black p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 dark:text-slate-400">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                                    <div className="flex items-center mt-2">
                                        <span className={`text-sm font-medium ${stat.changeType === 'positive'
                                            ? 'text-green-600 dark:text-emerald-400'
                                            : 'text-red-600 dark:text-red-400'
                                            }`}>
                                            {stat.change}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-slate-400 ml-2">
                                            from last month
                                        </span>
                                    </div>
                                </div>
                                <div className={`p-3 rounded-full ${stat.bgColor} dark:bg-opacity-20`}>
                                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:backdrop-blur-sm p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm lg:col-span-2">
                    <h3 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">Revenue Overview</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={darkMode ? 0.6 : 0.3} />
                                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: darkMode ? '#0F172A' : '#FFFFFF',
                                        border: `1px solid ${darkMode ? '#1E293B' : '#E2E8F0'}`,
                                        borderRadius: '8px',
                                        color: darkMode ? '#FFFFFF' : '#1F2937'
                                    }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:backdrop-blur-sm p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">User Activity</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: darkMode ? '#0F172A' : '#FFFFFF',
                                        border: `1px solid ${darkMode ? '#1E293B' : '#E2E8F0'}`,
                                        borderRadius: '8px',
                                        color: darkMode ? '#FFFFFF' : '#1F2937'
                                    }}
                                />
                                <Bar dataKey="active" fill="#22C55E" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="inactive" fill="#6B7280" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:backdrop-blur-sm p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">Recent Activities</h3>
                <div className="space-y-4">
                    {recentActivities.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                            <div key={activity.id} className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <Icon className={`h-5 w-5 ${activity.iconColor}`} />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.description}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                            {activity.category}
                                        </span>
                                        <span className="text-xs text-slate-400">{activity.timestamp}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
