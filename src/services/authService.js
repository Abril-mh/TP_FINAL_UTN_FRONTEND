import ENVIRONMENT from "../config/environment";

export async function register(name, email, password) {
    const res = await fetch(`${ENVIRONMENT.URL_API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });
    return await res.json();
}

export async function login(email, password) {
    const res = await fetch(`${ENVIRONMENT.URL_API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return await res.json();
}

