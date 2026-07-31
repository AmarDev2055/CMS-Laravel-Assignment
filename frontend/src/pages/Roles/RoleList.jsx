import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";

import Layout from "../../components/Layout/Layout";
import * as roleApi from "../../api/roles";

export default function RoleList() {
    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRoles();
    }, []);

    async function loadRoles() {
        try {
            const { data } = await roleApi.getRoles();
            setRoles(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete this role?")) return;

        try {
            await roleApi.deleteRole(id);
            loadRoles();
        } catch (error) {
            console.error(error);
            alert("Unable to delete role.");
        }
    }

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64 text-gray-500">
                    Loading roles...
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
                            Roles
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage user roles and permissions
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/roles/create")}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow"
                    >
                        <Plus size={18} />
                        Add Role
                    </button>
                </div>


                {/* Role Table */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Name
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Description
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Users
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Privileges
                                </th>

                                <th className="p-4 text-center text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>


                        <tbody>
                            {roles.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-10 text-gray-400"
                                    >
                                        No roles found.
                                    </td>
                                </tr>
                            ) : (
                                roles.map((role) => (
                                    <tr
                                        key={role.id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="p-4 font-medium text-gray-800">
                                            {role.name}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {role.description || "-"}
                                        </td>

                                        <td className="p-4">
                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {role.users_count}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-2">
                                                {role.privileges?.map((privilege) => (
                                                    <span
                                                        key={privilege.id}
                                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                                                    >
                                                        {privilege.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() => navigate(`/roles/${role.id}/edit`)}
                                                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                >
                                                    <Edit size={16} />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(role.id)}
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

            </div>
        </Layout>
    );
}