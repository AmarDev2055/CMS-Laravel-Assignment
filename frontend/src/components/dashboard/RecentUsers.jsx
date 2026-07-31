import React from "react";

export default function RecentUsers({ users = [] }) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
                Recent Users
            </h2>

            <div className="space-y-3">
                {users.length === 0 ? (
                    <p className="text-gray-500">
                        No users found.
                    </p>
                ) : (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="border-b pb-3 last:border-none"
                        >
                            <div className="font-medium">
                                {user.name}
                            </div>

                            <div className="text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}