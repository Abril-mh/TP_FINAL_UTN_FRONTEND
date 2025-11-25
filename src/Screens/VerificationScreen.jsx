import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ENVIRONMENT from "../config/environment.js";

export const VerificationScreen = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await fetch(
                    `${ENVIRONMENT.URL_API}/api/auth/verify?token=${token}`
                );

                const data = await res.json();

                // Validación correcta
                if (!res.ok) {
                    alert(data.message || "Error al verificar el correo.");
                    return;
                }

                alert("¡Correo verificado correctamente!");
                navigate("/login?from=verified_email");
            } catch (err) {
                console.error(err);
                alert("Error al conectar con el servidor.");
            }
        };

        verify();
    }, [token, navigate]);

    return <h1>Verificando correo...</h1>;
};