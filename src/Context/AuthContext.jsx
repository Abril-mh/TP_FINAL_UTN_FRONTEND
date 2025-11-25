import { createContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [checking, setChecking] = useState(true); // ⏳ Nuevo: evita bloquear rutas antes de tiempo

    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        if (!token) {
            setChecking(false);
            return;
        }

        const decoded = decodeToken(token);

        if (decoded) {
            setUser(decoded);
            setIsLogged(true);
        } else {
            setUser(null);
            setIsLogged(false);
        }

        setChecking(false);
    }, []);

    function onLogin(token) {
        localStorage.setItem("auth_token", token);
        setUser(decodeToken(token));
        setIsLogged(true);

        navigate("/home", { replace: true });
    }

    function onLogout() {
        localStorage.removeItem("auth_token");
        setUser(null);
        setIsLogged(false);
        navigate("/login", { replace: true });
    }

    return (
        <AuthContext.Provider value={{ isLogged, user, checking, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;