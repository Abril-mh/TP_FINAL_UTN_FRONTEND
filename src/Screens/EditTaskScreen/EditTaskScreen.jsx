import { useEffect, useState } from "react";
import { getTaskById, updateTask } from "../../services/TaskService.js";
import useFetch from "../../hooks/useFetch.jsx";
import { useNavigate, useParams } from "react-router-dom";

const EditTaskScreen = () => {
    const [form, setForm] = useState({
        title: "",
        description: ""
    });

    const { id } = useParams();
    const { sendRequest, response, loading } = useFetch();
    const navigate = useNavigate();

    // Trae la tarea al entrar a la pantalla
    useEffect(() => {
        sendRequest(() => getTaskById(id));
    }, []);

    // Cuando llega la respuesta del backend, rellena el formulario
    useEffect(() => {
        if (response?.data?.task) {
            const task = response.data.task;
            setForm({
                title: task.title || "",
                description: task.description || ""
            });
        }
    }, [response]);

    // Cada vez que cambia el input → actualiza el estado
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Enviar actualización al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest(() => updateTask(id, form));

        navigate("/home");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Editar Tarea</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    maxWidth: "400px"
                }}
            >

                {/* SOLO UN INPUT — NO SE CREA BARRA NUEVA */}
                <input
                    type="text"
                    name="title"
                    placeholder="Título de la tarea..."
                    value={form.title}
                    onChange={handleChange}
                    style={{
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #aaa"
                    }}
                />

                <textarea
                    name="description"
                    placeholder="Descripción (opcional)"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    style={{
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #aaa"
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "10px",
                        background: "#1e90ff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    {loading ? "Guardando..." : "Actualizar"}
                </button>
            </form>
        </div>
    );
};

export default EditTaskScreen;