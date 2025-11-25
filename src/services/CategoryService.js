
import ENVIRONMENT from "../config/environment.js";

const token = () => localStorage.getItem("auth_token");

export async function getCategories() {
    const res = await fetch(`${ ENVIRONMENT.URL_API } / api / categories`, {
        headers: { Authorization: `Bearer ${ token() }` }
    });
return res.json();
}

export async function createCategory(data) {
    const res = await fetch(`${ ENVIRONMENT.URL_API } / api / categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ token() }`
        },
body: JSON.stringify(data)
    });
return res.json();
}

export async function deleteCategory(id) {
    const res = await fetch(`${ ENVIRONMENT.URL_API } / api / categories / ${ id }`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${ token() }` }
    });
return res.json();
}