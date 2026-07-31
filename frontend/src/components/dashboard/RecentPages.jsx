import React from "react";
import { FileText, Clock } from "lucide-react";

export default function RecentPages({ pages = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">
                    Recent Pages
                </h2>

                <FileText className="text-gray-400" size={22} />
            </div>

            <div className="space-y-3">
                {pages.length === 0 ? (
                    <div className="text-center py-8">
                        <FileText
                            className="mx-auto text-gray-300 mb-3"
                            size={40}
                        />

                        <p className="text-gray-500 text-sm">
                            No pages found.
                        </p>
                    </div>
                ) : (
                    pages.map((page) => (
                        <div
                            key={page.id}
                            className="
                                group flex items-center justify-between
                                p-4 rounded-xl border
                                hover:bg-gray-50
                                transition
                            "
                        >
                            <div>
                                <h3 className="font-medium text-gray-800 group-hover:text-blue-600">
                                    {page.title}
                                </h3>

                                <div className="flex items-center gap-2 mt-1">
                                    <Clock size={14} className="text-gray-400" />

                                    <span className="text-sm text-gray-500">
                                        {page.updatedAt || "Recently updated"}
                                    </span>
                                </div>
                            </div>


                            <span
                                className={`
                                    px-3 py-1 rounded-full text-xs font-medium
                                    ${
                                        page.status === "Published"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }
                                `}
                            >
                                {page.status}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}