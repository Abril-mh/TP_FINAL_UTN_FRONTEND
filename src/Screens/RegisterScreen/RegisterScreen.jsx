import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { register } from "../../services/authService";

const RegisterScreen = () => {
    const initial = { username: "", email: "", password: "" };
    const { response, error, loading, sendRequest } = useFetch();

    function handleRegister(form) {
        sendRequest(() => register(form.username, form.email, form.password));
    }

    const { form_state, onInputChange, handleSubmit } = useForm(initial, handleRegister);

    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <input name="username" value={form_state.username} onChange={onInputChange} />
                <input name="email" value={form_state.email} onChange={onInputChange} />
                <input name="password" value={form_state.password} onChange={onInputChange} />

                {error && <p>{error}</p>}
                {response && <p>¡Registrado con éxito!</p>}

                {loading ? <button disabled>Registrando...</button> : <button>Registrarse</button>}
            </form>
        </div>
    );
};

export default RegisterScreen;
