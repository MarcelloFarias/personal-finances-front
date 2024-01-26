import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/signup";
import Home from "../pages/Home/home";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;