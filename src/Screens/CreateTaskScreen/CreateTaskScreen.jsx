
import { useState } from "react";
import { createTask } from "../../services/TaskService.js";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const CreateTaskScreen = () => {
    const [form, setForm] = useState({ title: "", description: "" });
    const { sendRequest, loading } = useFetch();
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await sendRequest(() => createTask(form));
        navigate("/home");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Crear Tarea</h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={form.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={form.description}
                    onChange={handleChange}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Crear"}
                </button>
            </form>
        </div>
    );
};

export default CreateTaskScreen;