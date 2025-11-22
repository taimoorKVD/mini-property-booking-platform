import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext.jsx";

export const RequireAdmin = ({ children }) => {
    const { isAdmin, isLoadingUser } = useAuth();
    const location = useLocation();

    if (isLoadingUser) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};