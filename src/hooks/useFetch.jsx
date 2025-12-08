import { useState } from "react";

const useFetch = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function sendRequest(requestCallback) {
        setLoading(true);
        setError(null);

        try {
            const data = await requestCallback();
            console.log("respuesta backend, porfavor:", data);

            if (data.ok === false) {
                throw new Error(data.message || "Error desconocido, oh no");
            }

            setResponse(data);
        } catch (err) {
            console.log("error fetch: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { response, loading, error, sendRequest };
};

export default useFetch;

