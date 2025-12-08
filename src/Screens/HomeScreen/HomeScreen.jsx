import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getTasks, deleteTask, createTask, updateTask } from "../../services/TaskService";
import "./HomeScreen.css";

const HomeScreen = () => {
    const { sendRequest, response, loading } = useFetch();
    const [newTask, setNewTask] = useState("");

    // Estados para edición en línea
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editForm, setEditForm] = useState({ title: "", description: "" });

    useEffect(() => {
        sendRequest(() => getTasks());
    }, []);

    const tasks =
        response?.tasks ||
        response?.data?.tasks ||
        response?.data ||
        response ||
        [];

    // Agregar tarea desde Home
    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        await sendRequest(() =>
            createTask({ title: newTask, description: "" })
        );

        setNewTask(""); // limpiar input
        await sendRequest(() => getTasks()); // recargar lista
    };

    // Eliminar tarea
    const handleDelete = async (id) => {
        await sendRequest(() => deleteTask(id));
        await sendRequest(() => getTasks());
    };

    // Iniciar edición
    const startEditing = (task) => {
        setEditingTaskId(task._id || task.id);
        setEditForm({ title: task.title, description: task.description });
    };

    // Cambiar valores del formulario de edición
    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    // Guardar cambios
    const saveEdit = async (id) => {
        console.log("datos que envio al backend lpm: ", editForm);
        await sendRequest(() => updateTask(id, editForm));
        setEditingTaskId(null);
        await sendRequest(() => getTasks()); // recargar lista con cambios
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Mis Tareas</h1>

            {/* FORM para agregar tarea */}
            <form className="add-task-form" onSubmit={handleAddTask}>
                <input
                    className="add-task-input"
                    type="text"
                    placeholder="Escribe una tarea..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button className="btn-create-inline" type="submit">
                    Add Task
                </button>
            </form>

            {loading && <p className="loading">Cargando...</p>}

            {!loading && tasks.length === 0 && (
                <p className="no-tasks">No tienes tareas aún.</p>
            )}

            <div className="tasks-list">
                {tasks.map((task) => (
                    <div className="task-card" key={task._id || task.id}>
                        {editingTaskId === (task._id || task.id) ? (
                            <>
                                <input
                                    name="title"
                                    value={editForm.title}
                                    onChange={handleEditChange}
                                    className="edit-input"
                                />
                                <textarea
                                    name="description"
                                    value={editForm.description}
                                    onChange={handleEditChange}
                                    className="edit-textarea"
                                />
                                <div className="task-actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() => saveEdit(task._id || task.id)}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        className="btn-cancel"
                                        onClick={() => setEditingTaskId(null)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="task-title">{task.title}</h3>
                                <p className="task-desc">{task.description}</p>
                                <div className="task-actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() => startEditing(task)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(task._id || task.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;