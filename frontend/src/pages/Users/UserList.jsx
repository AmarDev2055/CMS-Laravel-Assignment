import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        const timer = setTimeout(() => {
            loadUsers();
        }, 500);
        return () => clearTimeout(timer);
    }, [page, search, perPage]);

    async function loadUsers() {

        try {
            const response = await userApi.getUsers({
                page,
                search,
                per_page: perPage,
            });
            setUsers(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {
        return (
            <Layout>
                Loading...
            </Layout>
        );
    }

    return (

        <Layout>

            <div className="flex justify-between items-start mb-6">

                <h1 className="text-3xl font-bold">
                    Users
                </h1>

                <div className="flex gap-4">

                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="border rounded px-3 py-2 w-72"
                    />

                    <select
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                        className="border rounded px-3 py-2"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>

                </div>

                <button
                    onClick={() => navigate("/users/create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add User
                </button>

            </div>

            <div className="bg-white shadow rounded">

                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">
                                Name
                            </th>
                            <th className="p-3 text-left">
                                Email
                            </th>
                            <th className="p-3 text-left">
                                Roles
                            </th>
                            <th className="p-3 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 && (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-8 text-gray-500"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                            {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t"
                            >
                                <td className="p-3">
                                    {user.name}
                                </td>
                                <td className="p-3">
                                    {user.email}
                                </td>
                                <td className="p-3">

                                    {user.roles?.map(role => (
                                        <span
                                            key={role.id}
                                            className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-1 mr-2 text-sm"
                                        >
                                            {role.name}
                                        </span>
                                    ))}
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => navigate(`/users/${user.id}/edit`)}
                                        className="text-blue-600 mr-3"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-600"
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

        </Layout>

    );

}