import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../features/auth/AuthContext";

const queryClient = new QueryClient();

export const AppProviders = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>{children}</BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    );
};