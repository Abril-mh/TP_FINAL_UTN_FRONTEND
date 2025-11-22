import ENVIRONMENT from "../config/environment";

const token = () => localStorage.getItem("auth_token");

export async function getTasks() {
    const res = await fetch(`${ENVIRONMENT.URL_API}/api/tasks`, {
        headers: { Authorization: `Bearer ${token()}` }
    });
    return await res.json();
}

export async function createTask(title, description) {
    const res = await fetch(`${ENVIRONMENT.URL_API}/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`
        },
        body: JSON.stringify({ title, description })
    });
    return await res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${ENVIRONMENT.URL_API}/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` }
    });
    return await res.json();
}
