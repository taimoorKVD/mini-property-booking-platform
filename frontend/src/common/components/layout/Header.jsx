import { Link } from "react-router-dom";
import { useAuth } from "../../../features/auth/AuthContext.jsx";

export const Header = () => {
    const { isAuthenticated, isAdmin, user, logout } = useAuth();

    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link to="/" className="text-lg font-semibold">
                    Mini Property Booking
                </Link>

                <nav className="flex items-center gap-4 text-sm">
                    {isAuthenticated && (
                        <Link to="/" className="text-slate-700 hover:text-blue-600">
                            Explore
                        </Link>
                    )}

                    {isAuthenticated && (
                        <Link
                            to="/my-bookings"
                            className="text-slate-700 hover:text-blue-600"
                        >
                            My Bookings
                        </Link>
                    )}

                    {isAdmin && (
                        <Link
                            to="/admin/properties"
                            className="text-slate-700 hover:text-blue-600"
                        >
                            Admin
                        </Link>
                    )}

                    {isAuthenticated ? (
                        <>
      <span className="text-xs text-slate-500">
        {user?.name} {isAdmin && "(admin)"}
      </span>
                            <button
                                onClick={logout}
                                className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium hover:bg-slate-50"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-md px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};