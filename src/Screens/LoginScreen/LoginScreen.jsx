import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../services/authService.js";
import useForm from "../../hooks/useForm.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import { AuthContext } from "../../Context/AuthContext.jsx";

const LoginScreen = () => {
    const { onLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Aviso si viene del email verificado
    useEffect(() => {
        if (new URLSearchParams(location.search).get("from") === "verified_email") {
            alert("Correo verificado correctamente");
        }
    }, []);

    const { response, error, loading, sendRequest } = useFetch();

    const initial = { email: "", password: "" };
    const { form_state, onInputChange, handleSubmit } = useForm(initial, handleLogin);

    function handleLogin(form) {
        sendRequest(() => login(form.email, form.password));
    }

    // Cuando llega respuesta del backend
    useEffect(() => {
        if (response?.ok) {
            onLogin(response.data.auth_token);
            navigate("/home"); // 🚀 Redirección
        }
    }, [response, onLogin, navigate]);

    return (
        <div className="login-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form_state.email}
                    onChange={onInputChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form_state.password}
                    onChange={onInputChange}
                    required
                />

                {error && <p className="error">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Entrando..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginScreen;