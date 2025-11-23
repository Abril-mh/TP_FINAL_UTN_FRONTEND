import { Route, Routes } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import AuthMiddleware from "./Middleware/AuthMiddleware";
import { VerificationScreen } from "./Screens/VerificationScreen";

function App() {
    return (
        <Routes>
            <Route path="/verify_email/:token" element={<VerificationScreen />} />
            <Route path="/" element={<LoginScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route element={<AuthMiddleware />}>
                <Route path="/home" element={<HomeScreen />} />
            </Route>
        </Routes>
    );
}

export default App;

