import { NavLink } from "react-router-dom";
import { navigation } from "../../config/navigation";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
    const { user } = useAuth();

    const isModerator = user?.roles?.includes("Moderator");

    const filteredNavigation = navigation.filter((item) => {
        if (
            isModerator &&
            ["Users", "Roles", "Privileges"].includes(item.name)
        ) {
            return false;
        }

        return true;
    });

    console.log("Is Moderator:", isModerator);
    console.log("Sidebar Items:", filteredNavigation);

    return (
        <aside className="w-64 bg-gray-900 text-white">
            <div className="text-2xl font-bold p-6 border-b border-gray-700">
                CMS Admin
            </div>

            <nav className="p-4">
                {filteredNavigation.map((item) => (
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