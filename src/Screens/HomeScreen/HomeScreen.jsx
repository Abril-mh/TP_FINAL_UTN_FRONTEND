import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getTasks } from "../../services/TaskService";

const HomeScreen = () => {
    const { sendRequest, response, loading } = useFetch();

    useEffect(() => {
        sendRequest(() => getTasks());
    }, []);

    return (
        <div>
            <h1>Tareas</h1>

            {loading && <p>Cargando...</p>}

            {response?.data?.tasks?.map(task => (
                <div key={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    );
};

export default HomeScreen;


