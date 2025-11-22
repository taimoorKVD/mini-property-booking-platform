import {Route, Routes, Navigate} from "react-router-dom";
import {RequireAuth} from "./RequireAuth";
import {RequireAdmin} from "./RequireAdmin";

import {MainLayout} from "../../common/components/layout/MainLayout.jsx";
import {AdminLayout} from "../../common/components/layout/AdminLayout.jsx";

import {PropertyListPage} from "../../features/properties/pages/PropertyListPage";
import {PropertyDetailPage} from "../../features/properties/pages/PropertyDetailPage";
import {LoginPage} from "../../features/auth/LoginPage";
import {RegisterPage} from "../../features/auth/RegisterPage";
import {MyBookingsPage} from "../../features/bookings/pages/MyBookingsPage";
import {AdminPropertiesPage} from "../../features/admin/pages/AdminPropertiesPage";
import {AdminBookingsPage} from "../../features/admin/pages/AdminBookingsPage";

export const AppRoutes = () => (
    <Routes>
        <Route element={<MainLayout/>}>
            <Route path="/" element={<PropertyListPage/>}/>
        </Route>

        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>

        <Route
            element={
                <RequireAuth>
                    <MainLayout/>
                </RequireAuth>
            }
        >
            <Route path="/properties/:id" element={<PropertyDetailPage/>}/>
            <Route path="/my-bookings" element={<MyBookingsPage/>}/>
        </Route>

        <Route
            path="/admin/*"
            element={
                <RequireAuth>
                    <RequireAdmin>
                        <AdminLayout/>
                    </RequireAdmin>
                </RequireAuth>
            }
        >
            <Route path="properties" element={<AdminPropertiesPage/>}/>
            <Route path="bookings" element={<AdminBookingsPage/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace/>}/>
    </Routes>
);