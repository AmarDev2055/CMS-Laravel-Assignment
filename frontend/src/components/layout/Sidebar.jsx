import { NavLink } from "react-router-dom";
import { navigation } from "../../config/navigation";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-white">
            <div className="text-2xl font-bold p-6 border-b border-gray-700">
                CMS Admin
            </div>

            <nav className="p-4">
                {navigation.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded mb-2 ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-gray-700"
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}