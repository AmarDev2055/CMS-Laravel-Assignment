import { NavLink } from "react-router-dom";
import { navigation } from "../../config/navigation";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Users, Shield, KeyRound, FileText, Settings, LogOut, ChevronRight } from "lucide-react";

const icons = {
    Dashboard: LayoutDashboard,
    Users: Users,
    Roles: Shield,
    Privileges: KeyRound,
    Pages: FileText,
    Settings: Settings,
};

export default function Sidebar() {
    const { user } = useAuth();
    const isModerator = user?.roles?.includes("Moderator");

    const filteredNavigation = navigation.filter((item) => {
        if (isModerator && ["Users", "Roles", "Privileges"].includes(item.name)) {
            return false;
        }
        return true;
    });

    return (
        <aside className="w-72 min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col shadow-xl">

            {/* Logo */}
            <div className="px-6 py-5 border-b border-gray-800">
                <h1 className="text-2xl font-bold tracking-wide">CMS Admin</h1>
                <p className="text-xs text-gray-400 mt-1">Management Dashboard</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {filteredNavigation.map((item) => {
                    const Icon = icons[item.name] || FileText;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`
                            }
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </div>

                            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition" />
                        </NavLink>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="border-t border-gray-800 p-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <p className="text-sm font-semibold">{user?.name || "Admin"}</p>
                        <p className="text-xs text-gray-400">{user?.roles?.join(", ")}</p>
                    </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-red-600 transition text-sm">
                    <LogOut size={17} />
                    Logout
                </button>
            </div>

        </aside>
    );
}