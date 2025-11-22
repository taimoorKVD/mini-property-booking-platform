import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../../features/auth/AuthContext.jsx";

export const AdminLayout = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold">Admin Panel</span>
                        <span className="text-xs text-slate-500">
              {user?.name} ({user?.role})
            </span>
                    </div>
                    <nav className="flex gap-4 text-sm">
                        <NavLink
                            to="/admin/properties"
                            className={({ isActive }) =>
                                isActive
                                    ? "font-medium text-blue-600"
                                    : "text-slate-700 hover:text-blue-600"
                            }
                        >
                            Properties
                        </NavLink>
                        <NavLink
                            to="/admin/bookings"
                            className={({ isActive }) =>
                                isActive
                                    ? "font-medium text-blue-600"
                                    : "text-slate-700 hover:text-blue-600"
                            }
                        >
                            Bookings
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
};