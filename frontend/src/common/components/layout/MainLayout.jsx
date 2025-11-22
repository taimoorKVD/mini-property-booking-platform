import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="mx-auto max-w-6xl px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
};