import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

import { PropertyListPage } from "../features/properties/pages/PropertyListPage";
import { PropertyDetailPage } from "../features/properties/pages/PropertyDetailPage";
import { LoginPage } from "../features/auth/LoginPage";
import { RegisterPage } from "../features/auth/RegisterPage";
import { MyBookingsPage } from "../features/bookings/pages/MyBookingsPage";
import { AdminDashboardPage } from "../features/admin/pages/AdminDashboardPage";
import { AdminPropertiesPage } from "../features/admin/pages/AdminPropertiesPage";
import { AdminPropertyFormPage } from "../features/admin/pages/AdminPropertyFormPage";
import { AdminBookingsPage } from "../features/admin/pages/AdminBookingsPage";
import { AdminAvailabilityPage } from "../features/admin/pages/AdminAvailabilityPage";

const PrivateRoute = ({ children, role }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;

    if (role && user.role !== role) return <Navigate to="/" replace />;

    return children;
};

export const AppRouter = () => (
    <Routes>
        {/* Public */}
        <Route path="/" element={<PropertyListPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Guest */}
        <Route
            path="/my-bookings"
            element={
                <PrivateRoute>
                    <MyBookingsPage />
                </PrivateRoute>
            }
        />

        {/* Admin */}
        <Route
            path="/admin"
            element={
                <PrivateRoute role="admin">
                    <AdminDashboardPage />
                </PrivateRoute>
            }
        />
        <Route
            path="/admin/properties"
            element={
                <PrivateRoute role="admin">
                    <AdminPropertiesPage />
                </PrivateRoute>
            }
        />
        <Route
            path="/admin/properties/new"
            element={
                <PrivateRoute role="admin">
                    <AdminPropertyFormPage />
                </PrivateRoute>
            }
        />
        <Route
            path="/admin/properties/:id/edit"
            element={
                <PrivateRoute role="admin">
                    <AdminPropertyFormPage />
                </PrivateRoute>
            }
        />
        <Route
            path="/admin/properties/:id/availability"
            element={
                <PrivateRoute role="admin">
                    <AdminAvailabilityPage />
                </PrivateRoute>
            }
        />
        <Route
            path="/admin/bookings"
            element={
                <PrivateRoute role="admin">
                    <AdminBookingsPage />
                </PrivateRoute>
            }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);
