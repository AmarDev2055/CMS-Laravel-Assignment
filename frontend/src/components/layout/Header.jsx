import { useAuth } from "../../context/AuthContext";
import { Search, Bell, LogOut, ChevronDown } from "lucide-react";

export default function Header() {
    const { user, logout } = useAuth();

    async function handleLogout() {
        await logout();
        window.location.href = "/";
    }

    return (
        <header className="h-20 bg-white border-b shadow-sm px-6 flex items-center justify-between">

            {/* Left Section */}
            <div className="flex items-center gap-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Laravel CMS</h1>
                    <p className="text-xs text-gray-400">Admin Dashboard</p>
                </div>

                {/* Search */}
                <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2 w-72">
                    <Search size={18} className="text-gray-400" />
                    <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-full" />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-5">

                {/* Notification */}
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                    <Bell size={22} className="text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* User */}
                <div className="flex items-center gap-3 border-l pl-5">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-gray-800">{user?.name || "Admin"}</p>
                        <p className="text-xs text-gray-500">{user?.roles?.join(", ")}</p>
                    </div>

                    <ChevronDown size={18} className="text-gray-400" />
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white transition font-medium text-sm"
                >
                    <LogOut size={17} />
                    Logout
                </button>
            </div>

        </header>
    );
}