// src/pages/Privileges/PrivilegeList.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

            const response = await privilegeApi.getPrivileges();

            setPrivileges(response.data.data);

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

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Privileges
                </h1>

                {/* Remove this button if privileges are read-only */}
                <button
                    onClick={() => navigate("/privileges/create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Privilege
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
                                Slug
                            </th>

                            <th className="p-3 text-left">
                                Used By Roles
                            </th>

                            <th className="p-3 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {privileges.map((privilege) => (

                            <tr
                                key={privilege.id}
                                className="border-t"
                            >

                                <td className="p-3">
                                    {privilege.name}
                                </td>

                                <td className="p-3">
                                    {privilege.slug}
                                </td>

                                <td className="p-3">
                                    {privilege.roles_count}
                                </td>

                                <td className="p-3">

                                    <button
                                        onClick={() => navigate(`/privileges/${privilege.id}/edit`)}
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

            </div>

        </Layout>

    );

}