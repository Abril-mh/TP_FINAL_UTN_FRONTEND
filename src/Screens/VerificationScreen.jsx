import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerificationScreen = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading"); // loading | success | error

    useEffect(() => {
        // Simulación de carga, como hacen plataformas reales
        const timer = setTimeout(() => {
            setStatus("success");
        }, 1800);

        return () => clearTimeout(timer);
    }, []);

    const goToLogin = () => {
        navigate("/login?from=verification");
    };

    return (
        <div style={styles.container}>
            {status === "loading" && (
                <div style={styles.center}>
                    <div className="spinner" style={styles.spinner}></div>
                    <p style={styles.text}>Verificando tu correo...</p>
                </div>
            )}

            {status === "success" && (
                <div style={styles.center}>
                    <h1 style={styles.successTitle}>¡Correo verificado!</h1>
                    <p style={styles.text}>
                        Tu cuenta está lista para usarse. Ya podés iniciar sesión.
                    </p>
                    <button style={styles.button} onClick={goToLogin}>
                        Ir al Login
                    </button>
                </div>
            )}

            {status === "error" && (
                <div style={styles.center}>
                    <h1 style={styles.errorTitle}>Error en la verificación</h1>
                    <p style={styles.text}>El enlace no es válido o expiró.</p>
                    <button style={styles.button} onClick={() => navigate("/login")}>
                        Volver al Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default VerificationScreen;

// 🎨 --- Estilos inline para simplicidad ---
const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f6fa",
        padding: "20px",
    },
    center: {
        textAlign: "center",
    },
    spinner: {
        width: "40px",
        height: "40px",
        border: "4px solid #ccc",
        borderTopColor: "#4CAF50",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "auto",
    },
    text: {
        marginTop: "15px",
        fontSize: "1.1rem",
        color: "#333",
    },
    successTitle: {
        color: "#2ecc71",
        fontSize: "2rem",
        marginBottom: "10px",
    },
    errorTitle: {
        color: "#e74c3c",
        fontSize: "2rem",
        marginBottom: "10px",
    },
    button: {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "1rem",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#4CAF50",
        color: "white",
        cursor: "pointer",
    },
};

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