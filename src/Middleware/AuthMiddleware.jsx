import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const AuthMiddleware = () => {
    const { user, loading } = useContext(AuthContext);

    // Mientras carga no renderizamos nada
    if (loading) return null;

    // Si NO hay user lo redirige al login
    if (!user) return <Navigate to="/login" replace />;

    // Si hay user como que deja entrar a la ruta protegida
    return <Outlet />;
};

export default AuthMiddleware;