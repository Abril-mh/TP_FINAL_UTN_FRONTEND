import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { login } from "../../services/authService.js";
import useForm from "../../hooks/useForm.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import { AuthContext } from "../../Context/AuthContext.jsx";

const LoginScreen = () => {
    const { onLogin } = useContext(AuthContext);
    const location = useLocation();

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

    useEffect(() => {
        if (response?.ok) {
            onLogin(response.data.auth_token);
        }
    }, [response]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="email" value={form_state.email} onChange={onInputChange} />
                <input name="password" value={form_state.password} onChange={onInputChange} />
                {error && <p>{error}</p>}
                <button disabled={loading}>
                    {loading ? "Entrando..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginScreen;

