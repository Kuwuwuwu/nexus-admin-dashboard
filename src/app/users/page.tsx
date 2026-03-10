'use client'

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    status: "Active" | "Inactive";
    role: string;
    joinedDate: string;
}

const usersData: User[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        status: "Active",
        role: "Admin",
        joinedDate: "2024-01-15"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
        status: "Active",
        role: "Editor",
        joinedDate: "2024-02-20"
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
        status: "Inactive",
        role: "Viewer",
        joinedDate: "2024-03-10"
    },
    {
        id: 4,
        name: "Alice Brown",
        email: "alice.brown@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
        status: "Active",
        role: "Editor",
        joinedDate: "2024-01-25"
    },
    {
        id: 5,
        name: "Charlie Wilson",
        email: "charlie.wilson@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=charlie",
        status: "Active",
        role: "Admin",
        joinedDate: "2024-02-15"
    }
];

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users] = useState<User[]>(usersData);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Users</h2>
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-slate-700">
                                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-slate-300">Name</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-slate-300">Email</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-slate-300">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-slate-300">Role</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-slate-300 hidden sm:table-cell">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-slate-400">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active'
                                                ? 'bg-green-100 text-green-800 dark:bg-emerald-900 dark:text-emerald-300'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-slate-400">{user.role}</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-slate-400 hidden sm:table-cell">
                                        <div className="sm:hidden">
                                            <span className="text-xs text-gray-500 dark:text-slate-500">Joined: {user.joinedDate}</span>
                                        </div>
                                        <div className="sm:block hidden">
                                            {user.joinedDate}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
