import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";

import Layout from "../../components/Layout/Layout";
import * as privilegeApi from "../../api/privileges";

export default function PrivilegeList() {
    const navigate = useNavigate();

    const [privileges, setPrivileges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPrivileges();
    }, []);

    async function loadPrivileges() {
        try {
            const { data } = await privilegeApi.getPrivileges();
            setPrivileges(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64 text-gray-500">
                    Loading privileges...
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
                            Privileges
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage system permissions and access controls
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/privileges/create")}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow"
                    >
                        <Plus size={18} />
                        Add Privilege
                    </button>
                </div>


                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Name
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Slug
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-gray-600">
                                    Used By Roles
                                </th>

                                <th className="p-4 text-center text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>


                        <tbody>
                            {privileges.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-10 text-gray-400"
                                    >
                                        No privileges found.
                                    </td>
                                </tr>
                            ) : (
                                privileges.map((privilege) => (
                                    <tr
                                        key={privilege.id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="p-4 font-medium text-gray-800">
                                            {privilege.name}
                                        </td>

                                        <td className="p-4">
                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {privilege.slug}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {privilege.roles_count}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() => navigate(`/privileges/${privilege.id}/edit`)}
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

            </div>
        </Layout>
    );
}