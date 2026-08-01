import Header from "../frontend/Header";
import Footer from "../frontend/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <Header />

            <main className="min-h-screen">
                <Outlet />
            </main>

            <Footer />
        </>
    );
}