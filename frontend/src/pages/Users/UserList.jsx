import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Search } from "lucide-react";

import Layout from "../../components/Layout/Layout";
import * as userApi from "../../api/users";

export default function UserList() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        const timer = setTimeout(loadUsers, 500);
        return () => clearTimeout(timer);
    }, [page, search, perPage]);

    async function loadUsers() {
        try {
            setLoading(true);

            const { data } = await userApi.getUsers({
                page,
                search,
                per_page: perPage,
            });

            setUsers(data.data);
            setMeta(data.meta);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function updateSearch(value) {
        setSearch(value);
        setPage(1);
    }

    function updatePerPage(value) {
        setPerPage(Number(value));
        setPage(1);
    }

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64 text-gray-500">
                    Loading users...
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
                            Users
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage system users and permissions
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/users/create")}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow"
                    >
                        <Plus size={18} />
                        Add User
                    </button>
                </div>


                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4">

                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-3 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => updateSearch(e.target.value)}
                            className="border rounded-xl pl-10 pr-4 py-2.5 w-72 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <select
                        value={perPage}
                        onChange={(e) => updatePerPage(e.target.value)}
                        className="border rounded-xl px-4 py-2.5"
                    >
                        <option value={10}>10 rows</option>
                        <option value={25}>25 rows</option>
                        <option value={50}>50 rows</option>
                    </select>

                </div>


                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Name
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Email
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Roles
                                </th>

                                <th className="p-4 text-center text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-10 text-gray-400"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="p-4 font-medium text-gray-800">
                                            {user.name}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {user.email}
                                        </td>

                                        <td className="p-4">
                                            {user.roles?.map((role) => (
                                                <span
                                                    key={role.id}
                                                    className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mr-2"
                                                >
                                                    {role.name}
                                                </span>
                                            ))}
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() => navigate(`/users/${user.id}/edit`)}
                                                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                >
                                                    <Edit size={16} />
                                                </button>

                                                <button
                                                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>

                </div>


                {/* Pagination */}
                <div className="bg-white border rounded-xl p-4 flex justify-between items-center">

                    <button
                        disabled={!meta.prev_page_url}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-4 py-2 border rounded-lg disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <span className="text-sm text-gray-600">
                        Page {meta.current_page || 1} of {meta.last_page || 1}
                    </span>

                    <button
                        disabled={!meta.next_page_url}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-4 py-2 border rounded-lg disabled:opacity-40"
                    >
                        Next
                    </button>

                </div>

            </div>
        </Layout>
    );
}