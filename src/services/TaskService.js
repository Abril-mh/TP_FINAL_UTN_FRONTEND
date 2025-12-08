import ENVIRONMENT from "../config/environment.js";

const token = () => localStorage.getItem("auth_token");

export async function getTasks() {
    const res = await fetch(`${ ENVIRONMENT.URL_API }/api/tasks`, {
        headers: { Authorization: `Bearer ${ token() }` }
    });
return await res.json();
}

export async function createTask(data) {
    const res = await fetch(`${ ENVIRONMENT.URL_API }/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ token() }`
        },
body: JSON.stringify(data) // << acepta {title, description, categoryId}
    });
return await res.json();
}

export async function getTaskById(id) {
    const res = await fetch(`${ ENVIRONMENT.URL_API }/api/tasks/${ id }`, {
        headers: { Authorization: `Bearer ${ token() }` }
    });
return res.json();
}

export async function updateTask(id, data) {
    const res = await fetch(`${ENVIRONMENT.URL_API}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${ ENVIRONMENT.URL_API }/api/tasks/${ id }`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${ token() }` }
    });
return await res.json();
}
