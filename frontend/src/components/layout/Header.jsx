import { useAuth } from "../../context/AuthContext";

export default function Header() {

    const { user, logout } = useAuth();

    async function handleLogout() {
        await logout();
        window.location.href = "/";
    }

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

            <div className="font-semibold text-lg">
                Laravel CMS
            </div>

            <div className="flex items-center gap-4">

                <span>{user?.name}</span>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>

        </header>
    );
}