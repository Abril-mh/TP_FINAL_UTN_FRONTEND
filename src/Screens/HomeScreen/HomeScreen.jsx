import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getTasks, deleteTask } from "../../services/TaskService.js";
import "./HomeScreen.css";

const HomeScreen = () => {
    console.log("CARGANDO EL NUEVO HOMESCREEN");
    const { sendRequest, response, loading } = useFetch();

    // Cuando queramos recargar la lista volvemos a llamar sendRequest con getTasks
    useEffect(() => {
        sendRequest(() => getTasks());
    }, [sendRequest]);

    // --- Manejo robusto de posibles formas de respuesta del backend ---
    // intenta: response.tasks, response.data.tasks, response.data, o response (por si devuelven el array directo)
    const tasks =
        response?.tasks ||
        response?.data?.tasks ||
        response?.data ||
        response ||
        [];

    // --- Función para eliminar y recargar ---
    const handleDelete = async (id) => {
        // 1) borrar
        await sendRequest(() => deleteTask(id));
        // 2) recargar la lista (aseguramos que la vista se actualice)
        await sendRequest(() => getTasks());
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Mis Tareas</h1>

            {/* BOTÓN CREAR: va arriba de la lista */}
            <div style={{ marginBottom: 16 }}>
                <Link to="/create-task" className="btn-create">
                    + Crear nueva tarea
                </Link>
            </div>

            {loading && <p className="loading">Cargando...</p>}

            {!loading && tasks.length === 0 && (
                <p className="no-tasks">No tienes tareas aún.</p>
            )}

            <div className="tasks-list">
                {tasks.map(task => (
                    <div className="task-card" key={task._id || task.id}>
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-desc">{task.description}</p>

                        {/* BOTONES EDITAR + ELIMINAR: dentro de cada card */}
                        <div className="task-actions">
                            <Link to={`/edit-task/${task._id || task.id}`} className="btn-edit">
                                Editar
                            </Link>

                            <button
                                className="btn-delete"
                                onClick={() => handleDelete(task._id || task.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;