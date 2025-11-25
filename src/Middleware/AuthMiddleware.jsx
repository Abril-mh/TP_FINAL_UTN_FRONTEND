import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const AuthMiddleware = () => {
    const { isLogged, checking } = useContext(AuthContext);

    if (checking) return null; // ⏳ evita navegar antes de tiempo

    return isLogged ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthMiddleware;