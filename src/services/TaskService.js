import ENVIRONMENT from "../config/environment";

const token = () => localStorage.getItem("auth_token")

export async function getTasks() {
    const response = await fetch(
        ENVIRONMENT.URL_API + "/api/tasks",
        {
            headers: {
                "Authorization": `Bearer ${token()}`
            }
        }
    )
    return await response.json()
}

export async function createTask(title, description) {
    const response = await fetch(
        ENVIRONMENT.URL_API + "/api/tasks",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token()}`
            },
            body: JSON.stringify({ title, description })
        }
    )
    return await response.json()
}

export async function deleteTask(id) {
    const response = await fetch(
        ENVIRONMENT.URL_API + `/api/tasks/${id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token()}`
            }
        }
    )
    return await response.json()
}
