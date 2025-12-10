import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../services/authService.js";
import useForm from "../../hooks/useForm.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import { AuthContext } from "../../Context/AuthContext.jsx";
import "./LoginScreen.css";

const LoginScreen = () => {
    const { onLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Si viene del mail verificado
    useEffect(() => {
        if (new URLSearchParams(location.search).get("from") === "verified_email") {
            alert("Correo verificado correctamente");
        }
    }, []);

    const { response, error, loading, sendRequest } = useFetch();

    const initial = { email: "", password: "" };
    const { form_state, onInputChange, handleSubmit } = useForm(initial, handleLogin);

    function handleLogin(form) {
        console.log("Enviando login:", form);
        sendRequest(() => login(form.email, form.password));
    }

    // Al recibir respuesta del backend
    useEffect(() => {
        if (response && response.auth_token) {
            onLogin(response.auth_token);
            navigate("/home");
        }

        if (response && response.error) {
            console.error("Error en login:", response.error);
        }
    }, [response, onLogin, navigate]);

return (
    <div className="login-page">
        <div className="login-container">
            <h1 className="form-title">Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form_state.email}
                    onChange={onInputChange}
                    required
                    className="form-input"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form_state.password}
                    onChange={onInputChange}
                    required
                    className="form-input"
                />

                {error && <p className="error">{error}</p>}

                <button type="submit" disabled={loading} className="form-button">
                    {loading ? "Entrando..." : "Login"}
                </button>

                <p className="form-link">
                    ¿No tenés cuenta?
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        style={{
                            background: "none",
                            border: "none",
                            color: "blue",
                            cursor: "pointer",
                        }}
                    >
                        Crear cuenta
                    </button>
                </p>
            </form>

            {response?.message && <p className="success">{response.message}</p>}
        </div>
    </div>
);
};

export default LoginScreen;




