import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../features/auth/AuthContext";

export const Navbar = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const navLinkClass = ({ isActive }) =>
        `px-3 py-2 text-sm font-medium rounded-md ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
        }`;

    return (
        <header className="border-b bg-white sticky top-0 z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
              P
            </span>
                        <span className="text-lg font-semibold tracking-tight">
              Mini Property Booking
            </span>
                    </Link>

                    {/* desktop nav */}
                    <nav className="hidden md:flex items-center gap-3">
                        <NavLink to="/" className={navLinkClass} end>
                            Browse
                        </NavLink>
                        {user && (
                            <NavLink to="/my-bookings" className={navLinkClass}>
                                My Bookings
                            </NavLink>
                        )}
                        {user?.role === "admin" && (
                            <>
                                <NavLink to="/admin" className={navLinkClass}>
                                    Admin
                                </NavLink>
                                <NavLink to="/admin/properties" className={navLinkClass}>
                                    Properties
                                </NavLink>
                                <NavLink to="/admin/bookings" className={navLinkClass}>
                                    Bookings
                                </NavLink>
                            </>
                        )}

                        {!user && (
                            <>
                                <NavLink to="/login" className={navLinkClass}>
                                    Log in
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        `px-3 py-2 text-sm font-semibold rounded-md border ${
                                            isActive
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-blue-700 border-blue-600 hover:bg-blue-50"
                                        }`
                                    }
                                >
                                    Sign up
                                </NavLink>
                            </>
                        )}

                        {user && (
                            <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">
                  Hi, <span className="font-semibold">{user.name}</span>
                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 rounded-md hover:bg-slate-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </nav>

                    {/* mobile button */}
                    <button
                        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            {open ? (
                                <path
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* mobile nav */}
            {open && (
                <div className="md:hidden border-t bg-white">
                    <div className="px-4 py-3 space-y-1">
                        <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)} end>
                            Browse
                        </NavLink>
                        {user && (
                            <NavLink
                                to="/my-bookings"
                                className={navLinkClass}
                                onClick={() => setOpen(false)}
                            >
                                My Bookings
                            </NavLink>
                        )}
                        {user?.role === "admin" && (
                            <>
                                <NavLink
                                    to="/admin"
                                    className={navLinkClass}
                                    onClick={() => setOpen(false)}
                                >
                                    Admin
                                </NavLink>
                                <NavLink
                                    to="/admin/properties"
                                    className={navLinkClass}
                                    onClick={() => setOpen(false)}
                                >
                                    Properties
                                </NavLink>
                                <NavLink
                                    to="/admin/bookings"
                                    className={navLinkClass}
                                    onClick={() => setOpen(false)}
                                >
                                    Bookings
                                </NavLink>
                            </>
                        )}
                        {!user && (
                            <>
                                <NavLink
                                    to="/login"
                                    className={navLinkClass}
                                    onClick={() => setOpen(false)}
                                >
                                    Log in
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={navLinkClass}
                                    onClick={() => setOpen(false)}
                                >
                                    Sign up
                                </NavLink>
                            </>
                        )}
                        {user && (
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    handleLogout();
                                }}
                                className="w-full text-left px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-slate-100"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};
