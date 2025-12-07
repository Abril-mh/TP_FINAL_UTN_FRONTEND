import { useEffect } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import { getTaskById } from "../../services/TaskService.js";
import { useParams } from "react-router-dom";

const TaskDetailScreen = () => {
    const { id } = useParams();
    const { sendRequest, response, loading } = useFetch();

    useEffect(() => {
        sendRequest(() => getTaskById(id));
    }, []);

    const task = response?.data?.task;

    return (
        <div style={{ padding: "20px" }}>
            {loading && <p>Cargando...</p>}

            {task && (
                <>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    {task.category && <p>Categoría: {task.category.name}</p>}
                </>
            )}
        </div>
    );
};

export default TaskDetailScreen;