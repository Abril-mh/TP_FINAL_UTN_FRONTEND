import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getTasks, deleteTask } from "../../services/TaskService.js";
import "./HomeScreen.css";

const HomeScreen = () => {
    console.log("CARGANDO EL HOMESCREEN");
    const { sendRequest, response, loading } = useFetch();

    useEffect(() => {
        sendRequest(() => getTasks());
    }, []);

    // Tu manejo robusto (lo dejamos igual)
    const tasks =
        response?.tasks ||
        response?.data?.tasks ||
        response?.data ||
        response ||
        [];

    //  ⭐ ARREGLO: eliminar sin crear bucle ni doble carga
    const handleDelete = async (id) => {
        await sendRequest(() => deleteTask(id));
        // importante: UNA SOLA llamada para recargar
        sendRequest(() => getTasks());
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Mis Tareas</h1>

            <div style={{ marginBottom: 16 }}>
                <Link to="/create-task" className="btn-create">
                    + Crear nueva tarea
                </Link>
            </div>

            {/* ⭐ ARREGLO: solo mostrar cargando si NO hay datos aún */}
            {loading && tasks.length === 0 && (
                <p className="loading">Cargando...</p>
            )}

            {!loading && tasks.length === 0 && (
                <p className="no-tasks">No tienes tareas aún.</p>
            )}

            <div className="tasks-list">
                {tasks.map(task => (
                    <div className="task-card" key={task._id || task.id}>
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-desc">{task.description}</p>

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