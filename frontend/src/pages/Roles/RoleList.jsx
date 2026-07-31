import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

            const response = await roleApi.getRoles();

            setRoles(response.data.data);

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
                Loading...
            </Layout>
        );
    }

    return (

        <Layout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Roles
                </h1>

                <button
                    onClick={() => navigate("/roles/create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Role
                </button>

            </div>

            <div className="bg-white rounded shadow">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-3 text-left">
                                Name
                            </th>

                            <th className="p-3 text-left">
                                Description
                            </th>

                            <th className="p-3 text-left">
                                Users
                            </th>

                            <th className="p-3 text-left">
                                Privileges
                            </th>

                            <th className="p-3 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {roles.map(role => (

                            <tr
                                key={role.id}
                                className="border-t"
                            >

                                <td className="p-3 font-medium">
                                    {role.name}
                                </td>

                                <td className="p-3">
                                    {role.description || "-"}
                                </td>

                                <td className="p-3">
                                    {role.users_count}
                                </td>

                                <td className="p-3">

                                    <div className="flex flex-wrap gap-1">

                                        {role.privileges.map(privilege => (

                                            <span
                                                key={privilege.id}
                                                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                                            >
                                                {privilege.name}
                                            </span>

                                        ))}

                                    </div>

                                </td>

                                <td className="p-3 text-center">

                                   <button
                                        onClick={() => navigate(`/roles/${role.id}/edit`)}
                                        className="text-blue-600 mr-3"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(role.id)}
                                        className="text-red-600"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </Layout>

    );

}