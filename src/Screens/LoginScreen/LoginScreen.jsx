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
                <p>
                    ¿No tenés cuenta?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
                        Crear cuenta
                    </button>
                </p>
            </form>
            {response?.message && <p className="success">{response.message}</p>}
        </div>
    );
};

export default LoginScreen;

// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import ENVIRONMENT from "../config/environment.js";

// export const VerificationScreen = () => {
//     const { token } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const verify = async () => {
//             try {
//                 const res = await fetch(
//                     `${ENVIRONMENT.URL_API}/api/auth/verify?token=${token}`
//                 );

//                 const data = await res.json();

//                 // Validación correcta
//                 if (!res.ok) {
//                     alert(data.message || "Error al verificar el correo.");
//                     return;
//                 }

//                 alert("¡Correo verificado correctamente!");
//                 navigate("/login?from=verified_email");
//             } catch (err) {
//                 console.error(err);
//                 alert("Error al conectar con el servidor.");
//             }
//         };

//         verify();
//     }, [token, navigate]);

//     return <h1>Verificando correo...</h1>;
// };

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../services/authService.js";
// import useForm from "../../hooks/useForm.jsx";
// import useFetch from "../../hooks/useFetch.jsx";

// const LoginScreen = () => {
//     const navigate = useNavigate();
//     const { response, error, loading, sendRequest } = useFetch();

//     const initial = {
//         email: "",
//         password: "",
//     };

//     const { form_state, onInputChange, handleSubmit } = useForm(
//         initial,
//         handleLogin
//     );

//     function handleLogin(form) {
//         // Esto solo envía email + password
//         // El backend enviará un mail de verificación
//         sendRequest(() => login(form.email, form.password));
//     }

//     // CUANDO LLEGA LA RESPUESTA DEL BACKEND
//     useEffect(() => {
//         if (response?.ok) {
//             alert("Te enviamos un enlace para verificar tu cuenta. Revisa tu correo.");
//             navigate("/verification"); // Pantalla que vos ya tenés
//         }
//     }, [response, navigate]);

//     return (
//         <div className="login-container">
//             <h1>Iniciar sesión</h1>

//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={form_state.email}
//                     onChange={onInputChange}
//                     required
//                 />

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Contraseña"
//                     value={form_state.password}
//                     onChange={onInputChange}
//                     required
//                 />

//                 {error && <p className="error">{error}</p>}

//                 <button type="submit" disabled={loading}>
//                     {loading ? "Enviando..." : "Enviar verificación"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default LoginScreen;




