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
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" value={form_state.name} onChange={onInputChange} />
                <input name="email" value={form_state.email} onChange={onInputChange} />
                <input name="password" value={form_state.password} onChange={onInputChange} />
                {error && <p>{error}</p>}
                {response?.ok && <p>¡Revisa tu mail para verificar la cuenta!</p>}
                <button disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
            </form>
        </div>
    );
};

export default RegisterScreen;

