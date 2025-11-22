import {createContext, useContext, useEffect, useState} from "react";
import {authApi} from "./api";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });
    const [isLoadingUser, setIsLoadingUser] = useState(false);

    const isAuthenticated = !!token;
    const isAdmin = user?.role === "admin";

    const login = async (credentials) => {
        const {token, user} = await authApi.login(credentials);

        setToken(token);
        setUser(user);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch {
            // ignore
        }
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const loadUser = async () => {
            if (!token || user) return;
            setIsLoadingUser(true);
            try {
                const me = await authApi.me();
                setUser(me);
                localStorage.setItem("user", JSON.stringify(me));
            } catch {
                setToken(null);
                setUser(null);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            } finally {
                setIsLoadingUser(false);
            }
        };
        loadUser();
    }, [token, user]);

    const value = {
        user,
        token,
        isAuthenticated,
        isAdmin,
        isLoadingUser,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
