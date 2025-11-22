import { useState } from "react";

const useFetch = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function sendRequest(requestCallback) {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const data = await requestCallback();

            if (data.ok === false) {
                throw new Error(data.message || "Error desconocido");
            }

            setResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { response, loading, error, sendRequest };
};

export default useFetch;

