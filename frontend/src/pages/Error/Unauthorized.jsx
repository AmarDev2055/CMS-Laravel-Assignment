import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export default function Unauthorized() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl rounded-xl p-10 text-center max-w-md">
                <FaLock className="text-red-500 text-6xl mx-auto mb-5" />

                <h1 className="text-4xl font-bold text-gray-800">
                    403
                </h1>

                <h2 className="text-2xl font-semibold mt-2">
                    Access Denied
                </h2>

                <p className="text-gray-500 mt-4">
                    You don't have permission to access this page.
                </p>

                <Link
                    to="/dashboard"
                    className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}