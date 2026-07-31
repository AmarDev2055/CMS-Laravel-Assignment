import Sidebar from "./Sidebar";
// import Header from "./Navbar";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Header />

                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}