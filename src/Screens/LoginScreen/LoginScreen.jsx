import { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { login } from "../../services/authService";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../Context/AuthContext";

const LoginScreen = () => {
    const { onLogin } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        if (query.get("from") === "verified_email") {
            alert("Correo verificado correctamente");
        }
    }, []);

    const initial = { email: "", password: "" };

    const { response, error, loading, sendRequest, resetResponse } = useFetch();

    function handleLogin(form) {
        resetResponse();
        sendRequest(() => login(form.email, form.password));
    }

    const { form_state, onInputChange, handleSubmit } = useForm(initial, handleLogin);

    useEffect(() => {
        if (response?.ok) {
            onLogin(response.data.auth_token);
        }
    }, [response]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input name="email" value={form_state.email} onChange={onInputChange} />

                <label>Password</label>
                <input name="password" value={form_state.password} onChange={onInputChange} />

                {error && <p>{error}</p>}
                {loading ? <button disabled>Entrando...</button> : <button>Login</button>}
            </form>
        </div>
    );
};

export default LoginScreen;
