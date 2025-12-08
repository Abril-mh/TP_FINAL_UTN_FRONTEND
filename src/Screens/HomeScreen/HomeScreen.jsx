import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getTasks, createTask, updateTask, deleteTask } from "../../services/TaskService";
import "./HomeScreen.css";

const HomeScreen = () => {
    const { sendRequest, response, loading } = useFetch();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    // Cargar tareas al iniciar
    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const res = await sendRequest(() => getTasks());
        const list =
            res?.tasks ||
            res?.data?.tasks ||
            res?.data ||
            res ||
            [];
        setTasks(list);
    };

    // Crear tarea
    const handleAdd = async () => {
        if (!newTask.trim()) return;

        await sendRequest(() => createTask({ title: newTask, description: "" }));
        setNewTask("");
        loadTasks();
    };

    // Eliminar tarea
    const handleDelete = async (id) => {
        await sendRequest(() => deleteTask(id));
        loadTasks();
    };

    // Guardar edición
    const handleUpdate = async (task) => {
        await sendRequest(() => updateTask(task.id || task._id, { title: editingText }));
        setEditingId(null);
        setEditingText("");
        loadTasks();
    };

    return (
        <div className="home-container">
            <h1 className="home-title">TO DO List</h1>

            {/* Input para nueva tarea */}
            <input
                className="task-input"
                type="text"
                placeholder="Enter a task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />

            <button className="btn-add" onClick={handleAdd}>
                Add Task
            </button>

            {loading && <p className="loading">Cargando...</p>}

            {!loading && tasks.length === 0 && (
                <p className="no-tasks">No tienes tareas aún.</p>
            )}

            <div className="tasks-list">
                {tasks.map((task) => (
                    <div className="task-card" key={task._id || task.id}>
                        {/* EDITANDO */}
                        {editingId === (task._id || task.id) ? (
                            <input
                                className="edit-input"
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                            />
                        ) : (
                            <span className="task-title">{task.title}</span>
                        )}

                        <div className="task-actions">
                            {editingId === (task._id || task.id) ? (
                                <button className="btn-edit" onClick={() => handleUpdate(task)}>
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="btn-edit"
                                    onClick={() => {
                                        setEditingId(task._id || task.id);
                                        setEditingText(task.title);
                                    }}
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                className="btn-delete"
                                onClick={() => handleDelete(task._id || task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;

// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
// import { getTasks, deleteTask } from "../../services/TaskService.js";
// import "./HomeScreen.css";

// const HomeScreen = () => {
//     console.log("CARGANDO EL HOMESCREEN");
//     const { sendRequest, response, loading } = useFetch();

//     useEffect(() => {
//         sendRequest(() => getTasks());
//     }, []);

//     // Tu manejo robusto (lo dejamos igual)
//     const tasks =
//         response?.tasks ||
//         response?.data?.tasks ||
//         response?.data ||
//         response ||
//         [];

//     //  ⭐ ARREGLO: eliminar sin crear bucle ni doble carga
//     const handleDelete = async (id) => {
//         await sendRequest(() => deleteTask(id));
//         // importante: UNA SOLA llamada para recargar
//         sendRequest(() => getTasks());
//     };

//     return (
//         <div className="home-container">
//             <h1 className="home-title">Mis Tareas</h1>

//             <div style={{ marginBottom: 16 }}>
//                 <Link to="/create-task" className="btn-create">
//                     + Crear nueva tarea
//                 </Link>
//             </div>

//             {/* ⭐ ARREGLO: solo mostrar cargando si NO hay datos aún */}
//             {loading && tasks.length === 0 && (
//                 <p className="loading">Cargando...</p>
//             )}

//             {!loading && tasks.length === 0 && (
//                 <p className="no-tasks">No tienes tareas aún.</p>
//             )}

//             <div className="tasks-list">
//                 {tasks.map(task => (
//                     <div className="task-card" key={task._id || task.id}>
//                         <h3 className="task-title">{task.title}</h3>
//                         <p className="task-desc">{task.description}</p>

//                         <div className="task-actions">
//                             <Link to={`/edit-task/${task._id || task.id}`} className="btn-edit">
//                                 Editar
//                             </Link>

//                             <button
//                                 className="btn-delete"
//                                 onClick={() => handleDelete(task._id || task.id)}
//                             >
//                                 Eliminar
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HomeScreen;