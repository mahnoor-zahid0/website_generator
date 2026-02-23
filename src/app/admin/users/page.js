'use client';

import { useState, useEffect } from 'react';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            setUsers(data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpgrade = async (userId) => {
        try {
            const response = await fetch(`/api/admin/users/${userId}/upgrade`, {
                method: 'PUT',
            });

            if (response.ok) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDowngrade = async (userId) => {
        try {
            const response = await fetch(`/api/admin/users/${userId}/downgrade`, {
                method: 'PUT',
            });

            if (response.ok) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>

            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Websites
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'PREMIUM'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : user.role === 'ADMIN'
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user._count?.websites || 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {user.role === 'ADMIN' ? (
                                            <span className="text-gray-400">Admin</span>
                                        ) : user.role === 'PREMIUM' ? (
                                            <button
                                                onClick={() => handleDowngrade(user.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Downgrade
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleUpgrade(user.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Upgrade to Premium
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
