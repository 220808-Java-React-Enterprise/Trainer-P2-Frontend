import { Routes, Route } from "react-router-dom";
import ErrorPage from "../../pages/error/ErrorPage";
import HomePage from "../../pages/home/HomePage";
import LoginPage from "../../pages/login/LoginPage";
import SignupPage from "../../pages/signup/SignupPage";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}