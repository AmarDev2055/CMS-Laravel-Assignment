import React from "react";

export default function RecentPages({ pages = [] }) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
                Recent Pages
            </h2>

            <div className="space-y-3">
                {pages.length === 0 ? (
                    <p className="text-gray-500">
                        No pages found.
                    </p>
                ) : (
                    pages.map((page) => (
                        <div
                            key={page.id}
                            className="border-b pb-3 last:border-none"
                        >
                            <div className="font-medium">
                                {page.title}
                            </div>

                            <div className="text-sm text-gray-500">
                                {page.status}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}