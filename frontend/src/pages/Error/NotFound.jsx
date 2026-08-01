import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-xl p-10 text-center max-w-lg">

                <FaExclamationTriangle className="mx-auto text-7xl text-red-500 mb-6" />

                <h1 className="text-6xl font-bold text-gray-800">
                    404
                </h1>

                <h2 className="text-2xl font-semibold mt-3">
                    Page Not Found
                </h2>

                <p className="text-gray-600 mt-4">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <Link
                    to="/dashboard"
                    className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Back to Dashboard
                </Link>

            </div>

        </div>
    );
}