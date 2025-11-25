import { Route, Routes } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import AuthMiddleware from "./Middleware/AuthMiddleware";
import { VerificationScreen } from "./Screens/VerificationScreen";
import CreateTaskScreen from "./Screens/Task/CreateTaskScreen";
import EditTaskScreen from "./Screens/Task/EditTaskScreen";
import TaskDetailScreen from "./Screens/Task/TaskDetailScreen";
import CategoriesScreen from "./Screens/Category/CategoriesScreen";

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