import React from "react";
import { Users, Mail } from "lucide-react";

export default function RecentUsers({ users = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">
                    Recent Users
                </h2>

                <Users className="text-gray-400" size={22} />
            </div>


            <div className="space-y-3">

                {users.length === 0 ? (
                    <div className="text-center py-8">
                        <Users
                            className="mx-auto text-gray-300 mb-3"
                            size={40}
                        />

                        <p className="text-gray-500 text-sm">
                            No users found.
                        </p>
                    </div>

                ) : (

                    users.map((user) => (
                        <div
                            key={user.id}
                            className="
                                flex items-center gap-4
                                p-4 rounded-xl border
                                hover:bg-gray-50
                                transition
                            "
                        >

                            {/* Avatar */}
                            <div
                                className="
                                    w-11 h-11 rounded-full
                                    bg-blue-100
                                    text-blue-600
                                    flex items-center justify-center
                                    font-semibold
                                "
                            >
                                {user.name
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>


                            <div className="flex-1">

                                <h3 className="font-medium text-gray-800">
                                    {user.name}
                                </h3>


                                <div className="flex items-center gap-2 mt-1">

                                    <Mail
                                        size={14}
                                        className="text-gray-400"
                                    />

                                    <span className="text-sm text-gray-500">
                                        {user.email}
                                    </span>

                                </div>

                            </div>


                            {user.role && (
                                <span
                                    className="
                                        px-3 py-1
                                        rounded-full
                                        text-xs
                                        bg-purple-100
                                        text-purple-700
                                        font-medium
                                    "
                                >
                                    {user.role}
                                </span>
                            )}

                        </div>
                    ))
                )}

            </div>
        </div>
    );
}