import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import * as pageApi from "../../api/pages";

export default function TrashPage() {

    const navigate = useNavigate();

    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPages();
    }, []);

    async function loadPages() {
        try {
            const response = await pageApi.getTrashPages();
            setPages(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {

            setLoading(false);
        }
    }

    async function handleRestore(id) {

        if (!window.confirm("Restore this page?"))
            return;

        try {
            await pageApi.restorePage(id);
            loadPages();
        } catch (error) {
            console.error(error);
            alert("Failed to restore page.");
        }
    }

    async function handleForceDelete(id) {

        if (!window.confirm("Permanently delete this page?")) {
            return;
        }

        try {
            await pageApi.forceDeletePage(id);
            loadPages();
        } catch (error) {
            console.error(error);
            alert("Failed to permanently delete page.");
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
                    Trashed Pages
                </h1>

                <button
                    onClick={() => navigate("/pages")}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Back to Pages
                </button>

            </div>

            <div className="bg-white shadow rounded">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left p-3">
                                Title
                            </th>

                            <th className="text-left p-3">
                                Menu
                            </th>

                            <th className="text-left p-3">
                                Status
                            </th>

                            <th className="text-left p-3">
                                Deleted At
                            </th>

                            <th className="text-center p-3">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        {pages.length === 0 && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-8 text-gray-500"
                                >
                                    Trash is empty.
                                </td>
                            </tr>
                        )}

                        {pages.map((page) => (

                            <tr
                                key={page.id}
                                className="border-t"
                            >

                                <td className="p-3">
                                    {page.title}
                                </td>

                                <td className="p-3">
                                    {page.menu?.title ?? "-"}
                                </td>

                                <td className="p-3">
                                    {page.status}
                                </td>

                                <td className="p-3">
                                    {page.deleted_at
                                        ? new Date(page.deleted_at).toLocaleString()
                                        : "-"}
                                </td>

                                <td className="p-3 text-center space-x-2">

                                    <button
                                        onClick={() => handleRestore(page.id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                    >
                                        Restore
                                    </button>

                                    <button
                                        onClick={() => handleForceDelete(page.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete Forever
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