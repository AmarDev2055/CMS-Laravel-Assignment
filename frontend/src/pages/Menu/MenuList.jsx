import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import * as menuApi from "../../api/menus";
import MenuTree from "./components/MenuTree";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function MenuList() {
    const navigate = useNavigate();

    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMenus();
    }, []);

    async function loadMenus() {
        try {
            const response = await menuApi.getMenus();
            setMenus(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function handleEdit(menu) {
        navigate(`/menus/${menu.id}/edit`);
    }

    async function handleDelete(menu) {
        if (!window.confirm(`Delete "${menu.title}"?`)) return;

        try {
            await menuApi.deleteMenu(menu.id);
            loadMenus();
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete menu."
            );
        }
    }

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64 text-gray-500">
                    Loading menus...
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Menus
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage website navigation menus
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/menus/create")}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow"
                    >
                        <Plus size={18} />
                        Add Menu
                    </button>
                </div>


                {/* Menu Table */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <table className="w-full">

                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Menu
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Slug
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Sort Order
                                </th>

                                <th className="p-4 text-center text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {menus.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-10 text-gray-400"
                                    >
                                        No menus found.
                                    </td>
                                </tr>
                            ) : (
                                <MenuTree
                                    menus={menus}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            )}
                        </tbody>

                    </table>
                </div>

            </div>
        </Layout>
    );
}