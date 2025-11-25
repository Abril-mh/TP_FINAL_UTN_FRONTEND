
import { useEffect, useState } from "react";
import { getTaskById, updateTask } from "../../services/TaskService";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";

const EditTaskScreen = () => {
    const [form, setForm] = useState({ title: "", description: "" });
    const { id } = useParams();
    const { sendRequest, response, loading } = useFetch();
    const navigate = useNavigate();

    useEffect(() => {
        sendRequest(() => getTaskById(id));
    }, []);

    useEffect(() => {
        if (response?.data?.task) {
            setForm({
                title: response.data.task.title,
                description: response.data.task.description
            });
        }
    }, [response]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await sendRequest(() => updateTask(id, form));
        navigate("/home");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Editar Tarea</h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Actualizar"}
                </button>
            </form>
        </div>
    );
};

export default EditTaskScreen;