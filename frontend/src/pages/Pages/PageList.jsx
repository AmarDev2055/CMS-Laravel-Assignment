import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import * as pageApi from "../../api/pages";
import * as menuApi from "../../api/menus";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Plus, Search, Edit, Trash2, Archive, ChevronLeft, ChevronRight } from "lucide-react";

export default function PageList() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isModerator = user?.roles?.includes("Moderator");

    const [pages, setPages] = useState([]);
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [menuId, setMenuId] = useState("");
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadPages();
        }, 400);

        return () => clearTimeout(timer);
    }, [search, status, menuId, perPage, page]);

    useEffect(() => {
        loadMenus();
    }, []);

    async function loadPages() {
        try {
            setLoading(true);
            const response = await pageApi.getPages({
                page,
                search,
                status,
                menu_id: menuId,
                per_page: perPage
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

    async function handleDelete(id) {
        if (!window.confirm("Delete this page?")) return;

        try {
            await pageApi.deletePage(id);
            loadPages();
        } catch (error) {
            alert("You do not have the authorization to Delete this functionality");
        }
    }

    return (
        <Layout>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Pages</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage CMS pages and content</p>
                    </div>

                    <button
                        onClick={() => navigate("/pages/create")}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow"
                    >
                        <Plus size={18} />
                        Add Page
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border p-5 flex flex-wrap gap-4">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search pages..."
                            className="border rounded-xl pl-10 px-4 py-2.5 w-72 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="border rounded-xl px-4 py-2.5"
                    >
                        <option value="">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>

                    <select
                        value={menuId}
                        onChange={e => setMenuId(e.target.value)}
                        className="border rounded-xl px-4 py-2.5"
                    >
                        <option value="">All Menus</option>
                        {menus.map(menu => (
                            <option key={menu.id} value={menu.id}>{menu.title}</option>
                        ))}
                    </select>

                    <select
                        value={perPage}
                        onChange={e => setPerPage(e.target.value)}
                        className="border rounded-xl px-4 py-2.5"
                    >
                        <option value="10">10 rows</option>
                        <option value="25">25 rows</option>
                        <option value="50">50 rows</option>
                    </select>

                    {!isModerator && (
                        <button
                            onClick={() => navigate("/pages/trash")}
                            className="ml-auto flex items-center gap-2 bg-gray-800 text-white px-4 rounded-xl"
                        >
                            <Archive size={17} />
                            Trash
                        </button>
                    )}
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    {loading ? (
                        <div className="p-10 text-center text-gray-500">Loading pages...</div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    {["Title", "Menu", "Status", "Actions"].map(head => (
                                        <th key={head} className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {pages.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-10 text-gray-400">
                                            No pages found
                                        </td>
                                    </tr>
                                )}

                                {pages.map(p => (
                                    <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium">{p.title}</td>
                                        <td className="px-6 py-4 text-gray-600">{p.menu?.title || "-"}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    p.status === "published"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button
                                                onClick={() => navigate(`/pages/${p.id}/edit`)}
                                                className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                                            >
                                                <Edit size={17} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center bg-white rounded-xl p-4 border">
                    <button
                        disabled={!meta.prev_page_url}
                        onClick={() => setPage(p => p - 1)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-40"
                    >
                        <ChevronLeft size={18} />
                        Previous
                    </button>

                    <span className="text-sm text-gray-600">
                        Page {meta.current_page || 1} / {meta.last_page || 1}
                    </span>

                    <button
                        disabled={!meta.next_page_url}
                        onClick={() => setPage(p => p + 1)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-40"
                    >
                        Next
                        <ChevronRight size={18} />
                    </button>
                </div>

            </div>
        </Layout>
    );
}