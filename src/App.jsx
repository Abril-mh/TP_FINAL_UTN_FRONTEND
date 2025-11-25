import { Route, Routes } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen/LoginScreen.jsx";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen.jsx";
import HomeScreen from "./Screens/HomeScreen/HomeScreen.jsx";
import AuthMiddleware from "./Middleware/AuthMiddleware.jsx";
import { VerificationScreen } from "./Screens/VerificationScreen.jsx";
import CreateTaskScreen from "./Screens/CreatetaskScreen/CreateTaskScreen.jsx";
import EditTaskScreen from "./Screens/EditTaskScreen/EditTaskScreen.jsx";
import TaskDetailScreen from "./Screens/TaskDetailScreen/TaskDetailScreen.jsx";
import CategoriesScreen from "./Screens/CategoriesScreen/CategoriesScreen.jsx";

function App() {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<LoginScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/verify_email/:token" element={<VerificationScreen />} />
            {/* Rutas protegidas */}
            <Route element={<AuthMiddleware />}>
                <Route path="/home" element={<HomeScreen />} />
                {/* Tareas */}
                <Route path="/tasks/create" element={<CreateTaskScreen />} />
                <Route path="/tasks/:id" element={<TaskDetailScreen />} />
                <Route path="/tasks/:id/edit" element={<EditTaskScreen />} />
                {/* Categorías */}
                <Route path="/categories" element={<CategoriesScreen />} />
            </Route>
        </Routes>
    );
}

export default App;