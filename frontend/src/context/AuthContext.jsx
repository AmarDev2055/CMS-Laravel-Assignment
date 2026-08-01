import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {

        if (!token) {
            setLoading(false);
            return;
        }   

        authApi.currentUser()
            .then((response) => {
                console.log("Current User API:", response.data);
                setUser(response.data);
            })
            .catch(() => {
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [token]);

    const login = (token, user) => {

        localStorage.setItem("token", token);

        setToken(token);

        setUser(user);

    };

    const logout = async () => {

        try {
            await authApi.logout();
        } catch (e) {}

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);

    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                loading,
                login,
                logout,
                authenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);