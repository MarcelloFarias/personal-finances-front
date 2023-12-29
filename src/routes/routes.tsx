import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "../pages/LoginSignup/loginSignup";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginSignup/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;