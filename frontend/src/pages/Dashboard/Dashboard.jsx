import {
    FaFileAlt,
    FaUsers,
    FaFolder,
    FaUserShield,
    FaLock,
    FaCheckCircle,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

import useDashboard from "../../hook/useDashboard";

import StatCard from "../../components/dashboard/StatCard";
import RecentPages from "../../components/dashboard/RecentPages";
import RecentUsers from "../../components/dashboard/RecentUsers";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import Layout from "../../components/Layout/Layout";

export default function Dashboard() {
    const { dashboard, loading, error } = useDashboard();

    if (loading)
        return (
            <div className="p-8">
                Loading dashboard...
            </div>
        );

    if (error)
        return (
            <div className="p-8 text-red-600">
                {error}
            </div>
        );

    const stats = dashboard.statistics;

    return (
        <Layout>
        <div className="p-6 space-y-6">

            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <StatCard
                    title="Pages"
                    value={stats.pages}
                    icon={<FaFileAlt />}
                    color="bg-blue-500"
                />

                <StatCard
                    title="Users"
                    value={stats.users}
                    icon={<FaUsers />}
                    color="bg-green-500"
                />

                <StatCard
                    title="Menus"
                    value={stats.menus}
                    icon={<FaFolder />}
                    color="bg-yellow-500"
                />

                <StatCard
                    title="Roles"
                    value={stats.roles}
                    icon={<FaUserShield />}
                    color="bg-purple-500"
                />

                <StatCard
                    title="Privileges"
                    value={stats.privileges}
                    icon={<FaLock />}
                    color="bg-red-500"
                />

                <StatCard
                    title="Published"
                    value={stats.published_pages}
                    icon={<FaCheckCircle />}
                    color="bg-emerald-500"
                />

                <StatCard
                    title="Drafts"
                    value={stats.draft_pages}
                    icon={<FaEdit />}
                    color="bg-orange-500"
                />

                <StatCard
                    title="Trash"
                    value={stats.trashed_pages}
                    icon={<FaTrash />}
                    color="bg-gray-500"
                />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <RecentPages pages={dashboard.recent_pages} />

                <RecentUsers users={dashboard.recent_users} />

            </div>

            <DashboardCharts />

        </div>
        </Layout>
    );
}