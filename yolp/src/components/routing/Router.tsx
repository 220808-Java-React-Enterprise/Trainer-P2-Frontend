import { Routes, Route } from "react-router-dom";
import AdminPage from "../../pages/admin/AdminPage";
import ErrorPage from "../../pages/error/ErrorPage";
import HomePage from "../../pages/home/HomePage";
import LoginPage from "../../pages/login/LoginPage";
import { RestaurantPage } from "../../pages/restaurant/RestaurantPage";
import RestaurantsPage from "../../pages/restaurant/RestaurantsPage";
import SignupPage from "../../pages/signup/SignupPage";
import Layout from "./Layout";
import RequireAuth from "./RequireAuth";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* protected routes */}
                <Route element={<RequireAuth allowedRoles={["ADMIN", "DEFAULT"]} />} >
                    <Route path="/Restaurants" element={<RestaurantsPage />} />
                    <Route path="/Restaurant/:id" element={<RestaurantPage />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} >
                    <Route path="/admin" element={<AdminPage />} />
                </Route>

                {/* 404 not found */}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}