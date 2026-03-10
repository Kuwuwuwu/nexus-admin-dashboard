'use client'

import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useTheme } from "next-themes";

const userGrowthData = [
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1400 },
    { month: "Mar", users: 1600 },
    { month: "Apr", users: 1800 },
    { month: "May", users: 2100 },
    { month: "Jun", users: 2400 },
    { month: "Jul", users: 2700 },
    { month: "Aug", users: 2845 },
];

const trafficSourcesData = [
    { name: "Direct", value: 35, color: "#3B82F6" },
    { name: "Social", value: 25, color: "#10B981" },
    { name: "Organic", value: 20, color: "#F59E0B" },
    { name: "Referral", value: 15, color: "#8B5CF6" },
    { name: "Email", value: 5, color: "#EF4444" },
];


export default function AnalyticsPage() {
    const { theme } = useTheme();
    const darkMode = theme === 'dark';

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Growth Chart */}
                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:backdrop-blur-sm p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm lg:col-span-2">
                    <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">User Growth</h3>
                    <div className="h-[300px] lg:h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: darkMode ? '#0F172A' : '#FFFFFF',
                                        border: `1px solid ${darkMode ? '#1E293B' : '#E2E8F0'}`,
                                        borderRadius: '8px',
                                        color: darkMode ? '#FFFFFF' : '#1F2937'
                                    }}
                                />
                                <Bar
                                    dataKey="users"
                                    fill={darkMode ? "#06B6D4" : "#0891B2"}
                                    radius={[8, 8, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Traffic Sources Pie Chart */}
                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:backdrop-blur-sm p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Traffic Sources</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={trafficSourcesData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {trafficSourcesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={darkMode ? entry.color : entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: darkMode ? '#0F172A' : '#FFFFFF',
                                        border: `1px solid ${darkMode ? '#1E293B' : '#E2E8F0'}`,
                                        borderRadius: '8px',
                                        color: darkMode ? '#FFFFFF' : '#1F2937'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {trafficSourcesData.map((source, index) => {
                            const colorClasses = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-red-500"];
                            return (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${colorClasses[index % colorClasses.length]}`} />
                                        <span className="text-sm text-gray-600 dark:text-slate-400">
                                            {source.name}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {source.value}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm dark:backdrop-blur-sm p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Key Metrics</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-slate-400">Total Page Views</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2M</p>
                            </div>
                            <span className="text-emerald-400 text-sm font-medium">+18.2%</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-slate-400">Bounce Rate</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">32.5%</p>
                            </div>
                            <span className="text-red-400 text-sm font-medium">-2.1%</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-slate-400">Avg. Duration</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">4m 32s</p>
                            </div>
                            <span className="text-emerald-400 text-sm font-medium">+12.8%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
