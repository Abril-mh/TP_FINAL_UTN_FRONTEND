
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import { getCategories, createCategory, deleteCategory } from "../../services/CategoryService.js";

const CategoriesScreen = () => {
    const { sendRequest, response, loading } = useFetch();
    const [name, setName] = useState("");

    useEffect(() => {
        sendRequest(() => getCategories());
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        await sendRequest(() => createCategory({ name }));
        setName("");
    };

    const handleDelete = async id => {
        await sendRequest(() => deleteCategory(id));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Categorías</h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
                <input
                    type="text"
                    placeholder="Nueva categoría"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button type="submit">Crear</button>
            </form>

            <h2>Lista</h2>

            {loading && <p>Cargando...</p>}

            {response?.data?.categories?.map(cat => (
                <div key={cat._id} style={{ display: "flex", justifyContent: "space-between", width: "200px" }}>
                    <span>{cat.name}</span>
                    <button onClick={() => handleDelete(cat._id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};

export default CategoriesScreen;