import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const AuthMiddleware = () => {
    const { isLogged } = useContext(AuthContext);

    return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthMiddleware;

