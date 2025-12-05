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
                <input type="nombre" name= "nombre" placeholder= "nombre" value= {form_state.nombre} onChange={onInputChange} required/>
                <input type="email" name= "email" placeholder= "email" value= {form_state.email} onChange={onInputChange} required/>
                <input type="contraseña" name= "contraseña" placeholder= "contraseña" value= {form_state.contraseña} onChange={onInputChange} required/>
                {error && <p>{error}</p>}
                {response?.ok && <p>¡Revisa tu mail para verificar la cuenta!</p>}
                <button disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
            </form>
            {response?.message && <p className="success">{response.message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default RegisterScreen;

