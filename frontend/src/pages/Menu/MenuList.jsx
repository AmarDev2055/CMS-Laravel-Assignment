import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import * as menuApi from "../../api/menus";
import MenuTree from "./components/MenuTree";
import { useNavigate } from "react-router-dom";
export default function MenuList() {

    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        loadMenus();
    }, []);

    async function loadMenus() {

        try {

            const response = await menuApi.getMenus();

            setMenus(response.data.data);

        } finally {

            setLoading(false);

        }

    }
    
    function handleEdit(menu) {
        navigate(`/menus/${menu.id}/edit`);
    }

    async function handleDelete(menu) {

        const confirmed = window.confirm(
            `Delete "${menu.title}"?`
        );

        if (!confirmed) return;

        try {

            await menuApi.deleteMenu(menu.id);

            alert("Menu deleted successfully.");

            loadMenus();

        } catch (error) {

            console.error(error);
            alert(
                error.response?.data?.message ??
                "Unable to delete menu."
            );
        }
    }

    // async function loadMenus() {
    //     try {
    //         const response = await menuApi.getMenus();

    //         // Only root menus
    //         const roots = response.data.data.filter(
    //             menu => menu.parent_id === null
    //         );

    //         setMenus(roots);

    //     } finally {
    //         setLoading(false);
    //     }
    // }

    if (loading)
        return <Layout>Loading...</Layout>;

    return (

        <Layout>

            <div className="flex justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Menus
                </h1>

                <button
                    onClick={() => navigate("/menus/create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Menu
                </button>

            </div>

            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">
                            Menu
                        </th>
                        <th className="p-3 text-left">
                            Slug
                        </th>
                        <th className="p-3 text-left">
                            Sort Order
                        </th>
                        <th className="p-3 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>
               <tbody>
                    <MenuTree
                        menus={menus}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </tbody>

            </table>

        </Layout>

    );

}