
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getTasks } from "../../services/TaskService";
import "./HomeScreen.css";

const HomeScreen = () => {
    const { sendRequest, response, loading } = useFetch();

    useEffect(() => {
        sendRequest(() => getTasks());
    }, []);

    const tasks = response?.data?.tasks || [];

    return (
        <div className="home-container">
            <h1 className="home-title">Mis Tareas</h1>

            {loading && <p className="loading">Cargando...</p>}

            {!loading && tasks.length === 0 && (
                <p className="no-tasks">No tienes tareas aún.</p>
            )}

            <div className="tasks-list">
                {tasks.map(task => (
                    <div className="task-card" key={task._id}>
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-desc">{task.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;