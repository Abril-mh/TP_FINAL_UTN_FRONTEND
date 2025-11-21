import ENVIRONMENT from "../config/environment"

export async function register(name, email, password) {
    const body = { name, email, password }

    const response_http = await fetch(
        ENVIRONMENT.URL_API + "/api/auth/register",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }
    )

    return await response_http.json()
}

export async function login(email, password) {
    const body = { email, password }

    const response_http = await fetch(
        ENVIRONMENT.URL_API + "/api/auth/login",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }
    )

    return await response_http.json()
}

