import { useState } from "react";

const useFetch = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
async function sendRequest(requestCallback) {
    setError(null);
    setLoading(true);

    try {
        const data = await requestCallback();

        if (data.ok === false) throw new Error(data.message || "Error desconocido");

        setResponse(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
}

    function resetResponse() {
        setResponse(null);
    }

    return { response, loading, error, sendRequest, resetResponse };
};

export default useFetch;
