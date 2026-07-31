import { Loader2 } from "lucide-react";

export default function DashboardLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

            {/* Background Blur */}
            <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl right-20 top-20 animate-pulse"></div>

            {/* Card */}
            <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl px-12 py-10 flex flex-col items-center">

                {/* Logo */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 rounded-full bg-blue-500 blur-2xl opacity-40 animate-pulse"></div>

                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">
                        <span className="text-white text-4xl font-bold">
                            CMS
                        </span>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-800">
                    Dashboard
                </h2>

                <p className="text-gray-500 mt-2">
                    Loading your workspace...
                </p>

                {/* Progress */}
                <div className="w-72 h-2 bg-gray-200 rounded-full mt-8 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-progress"></div>
                </div>

                {/* Spinner */}
                <Loader2
                    size={32}
                    className="mt-8 text-blue-600 animate-spin"
                />

            </div>
        </div>
    );
}