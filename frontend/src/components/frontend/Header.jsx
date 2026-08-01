import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { getMenus } from "../../api/frontend/menuApi";

export default function Header() {
    const [menus, setMenus] =useState([]);

    useEffect(() => {
        loadMenus();
    }, []);

    async function loadMenus() {
        try {
            const response = await getMenus();
            setMenus(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 lg:px-8">

                {/* Logo */}

                <Link
                    to="#"
                    className="text-3xl font-extrabold tracking-tight text-slate-800 hover:text-blue-600 transition-colors"
                >
                    Laravel CMS
                </Link>

                {/* Navigation */}

                <nav className="hidden md:flex items-center space-x-2">

                    {/* Home */}

                    {/* <Link
                        to="/"
                        className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                        Home
                    </Link> */}

                    {menus.map((menu) => (
                        <div
                            key={menu.id}
                            className="relative group"
                        >
                            <Link
                                to={`/${menu.slug}`}
                                className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                            >
                                {menu.title}

                                {menu.children?.length > 0 && (
                                    <ChevronDown
                                        size={16}
                                        className="transition-transform duration-200 group-hover:rotate-180"
                                    />
                                )}
                            </Link>

                            {menu.children?.length > 0 && (
                                <div
                                    className="
                                        absolute
                                        left-0
                                        mt-2
                                        w-64
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-white
                                        shadow-xl
                                        opacity-0
                                        invisible
                                        translate-y-2
                                        group-hover:opacity-100
                                        group-hover:visible
                                        group-hover:translate-y-0
                                        transition-all
                                        duration-200
                                        overflow-hidden
                                    "
                                >
                                    {menu.children.map((child) => (
                                        <Link
                                            key={child.id}
                                            to={`/${child.slug}`}
                                            className="block px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                                        >
                                            {child.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                </nav>

                {/* Right Side */}

                <div className="hidden md:flex items-center gap-3">

                    <Link
                        to="/contact"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
                    >
                        Contact
                    </Link>

                </div>

            </div>
        </header>
    );
}