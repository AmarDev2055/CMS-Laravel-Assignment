import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { getAuditLogs } from "../../api/audit";

export default function AuditLogList() {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLogs();
    }, []);

    async function loadLogs() {

        try {

            const response = await getAuditLogs();

            setLogs(response.data.data);

        } finally {

            setLoading(false);

        }
    }

    return (
        <Layout>

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Audit Logs
                </h1>

                <div className="bg-white rounded-lg shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="text-left p-4">Time</th>

                                <th className="text-left p-4">User</th>

                                <th className="text-left p-4">Action</th>

                                <th className="text-left p-4">Module</th>

                                <th className="text-left p-4">Item</th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-6 text-center"
                                    >
                                        Loading...
                                    </td>
                                </tr>

                            ) : logs.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-6 text-center"
                                    >
                                        No audit logs found.
                                    </td>
                                </tr>

                            ) : (

                                logs.map(log => (

                                    <tr
                                        key={log.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-4">
                                            {new Date(log.created_at)
                                                .toLocaleString()}
                                        </td>

                                        <td className="p-4">
                                            {log.user?.name ?? "System"}
                                        </td>

                                        <td className="p-4">
                                            {log.action}
                                        </td>

                                        <td className="p-4">
                                            {log.entity}
                                        </td>

                                        <td className="p-4">
                                            {log.entity_name}
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