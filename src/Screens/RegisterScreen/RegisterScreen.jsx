import useForm from "../../hooks/useForm.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import { register } from "../../services/authService.js";

const RegisterScreen = () => {
    const initial = { name: "", email: "", password: "" };

    const { response, error, loading, sendRequest } = useFetch();
    const { form_state, onInputChange, handleSubmit } = useForm(initial, handleRegister);

    function handleRegister(form) {
        sendRequest(() => register(form.name, form.email, form.password));
    }

    return (
        <div className="form-container">
            <h1 className="form-title">Registro</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form_state.name}
                    onChange={onInputChange}
                    required
                    className="form-input"
                />

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

                {response?.ok && (
                    <p className="success">¡Revisa tu mail para verificar la cuenta!</p>
                )}

                <button disabled={loading} className="form-button">
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
            </form>

            {response?.message && <p className="success">{response.message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default RegisterScreen;