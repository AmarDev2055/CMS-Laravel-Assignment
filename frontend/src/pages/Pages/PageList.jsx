import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import * as pageApi from "../../api/pages";
import * as menuApi from "../../api/menus";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function PageList() {

    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const isModerator = currentUser?.role === "Moderator";

    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [menuId, setMenuId] = useState("");
    const [perPage, setPerPage] = useState(10);

    const [menus, setMenus] = useState([]);

    const { user } = useAuth();

console.log(user);
console.log(user?.roles);

    useEffect(() => {

        const timer = setTimeout(() => {
            loadPages();
        }, 500);

        return () => clearTimeout(timer);

    }, [search, status, menuId, perPage, page]);

    async function loadPages() {
        try {

            const response = await pageApi.getPages({
                page,
                search,
                status,
                menu_id: menuId,
                per_page: perPage,
            });

            setPages(response.data.data);
            setMeta(response.data.meta);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function loadMenus() {
        try {
            const response = await menuApi.getMenus();
            setMenus(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
        useEffect(() => {
        loadPages();
        loadMenus();
    }, []);


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this page?")) {
            return;
        }

        try {
            await pageApi.deletePage(id);
            loadPages();
        } catch (error) {
            console.error(error);
            alert("Failed to delete page.");
        }
    };

    return (
        <Layout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Pages
                </h1>

                <div className="flex gap-4 mb-6">

                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded px-3 py-2 w-72"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="border rounded px-3 py-2"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>

                    <select
                        className="border rounded px-3 py-2"
                        value={perPage}
                        onChange={(e) => setPerPage(e.target.value)}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>

                    <select
                        className="border rounded px-3 py-2"
                        value={menuId}
                        onChange={(e) => setMenuId(e.target.value)}
                    >
                        <option value="">All Menus</option>

                        {menus.map((menu) => (
                            <option
                                key={menu.id}
                                value={menu.id}
                            >
                                {menu.title}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={() => navigate("/pages/create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Page
                </button>

            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (

                <div className="bg-white shadow rounded">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="text-left p-3">Title</th>

                                <th className="text-left p-3">Menu</th>

                                <th className="text-left p-3">Status</th>

                                <th className="text-left p-3">Published</th>

                                <th className="text-center p-3">
    Actions
</th>
{!isModerator && (
    <th className="text-center p-3">
        <button
            onClick={() => navigate("/pages/trash")}
            className="bg-gray-700 text-white px-4 py-2 rounded"
        >
            Trash
        </button>
    </th>
)}

                            </tr>

                        </thead>

                        <tbody>

                            {pages.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-8 text-gray-500"
                                    >
                                        No pages found.
                                    </td>
                                </tr>
                            )}

                            {pages.map((p) => (

                                <tr
                                    key={p.id}
                                    className="border-t"
                                >

                                    <td className="p-3">
                                        {p.title}
                                    </td>

                                    <td className="p-3">
                                        {p.menu?.title}
                                    </td>

                                    <td className="p-3">
                                        {p.status}
                                    </td>

                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${
                                                p.status === "published"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {p.status}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center space-x-2">

                                       <button
                                           onClick={() => navigate(`/pages/${p.id}/edit`)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            disabled={!meta.prev_page_url}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className="px-4 py-2 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span>
                            Page {meta.current_page || 1} of {meta.last_page || 1}
                        </span>

                        <button
                            disabled={!meta.next_page_url}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-4 py-2 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>

            )}
        </Layout>
    );
}