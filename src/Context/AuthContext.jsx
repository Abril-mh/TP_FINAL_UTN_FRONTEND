import { createContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem("auth_token")));

    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        if (!token) {
            setIsLogged(false);
            setUser(null);
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
    }, []);

    function onLogin(token) {
        localStorage.setItem("auth_token", token);
        setIsLogged(true);
        setUser(decodeToken(token));
        navigate("/home");
    }

    function onLogout() {
        localStorage.removeItem("auth_token");
        setUser(null);
        setIsLogged(false);
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{ isLogged, user, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

