import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import ENVIRONMENT from "../config/environment";

export const VerificationScreen = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function verify() {
            try {
                const res = await fetch(
                    `${ENVIRONMENT.URL_API}/api/auth/verify/${token}`
                );

                const data = await res.json();

                if (data.ok) {
                    alert("¡Correo verificado correctamente!");
                    navigate("/login?from=verified_email");
                } else {
                    alert("Error al verificar el correo.");
                }
            } catch (err) {
                console.error(err);
                alert("Error al conectar con el servidor.");
            }
        }

        verify();
    }, []);

    return <h1>Verificando correo...</h1>;
};
