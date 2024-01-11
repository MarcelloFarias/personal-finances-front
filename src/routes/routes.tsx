import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/signup";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;