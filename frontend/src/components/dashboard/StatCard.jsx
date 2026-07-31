import React from "react";

export default function StatCard({
    title,
    value,
    icon,
    color = "bg-blue-500",
}) {
    return (
        <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between hover:shadow-lg transition">
            <div>
                <p className="text-gray-500 text-sm">{title}</p>

                <h2 className="text-3xl font-bold mt-2">
                    {value}
                </h2>
            </div>

            <div className={`${color} text-white p-4 rounded-full text-2xl`}>
                {icon}
            </div>
        </div>
    );
}