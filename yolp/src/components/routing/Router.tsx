import { Routes, Route } from "react-router-dom";
import AdminPage from "../../pages/admin/AdminPage";
import ErrorPage from "../../pages/error/ErrorPage";
import HomePage from "../../pages/home/HomePage";
import LoginPage from "../../pages/login/LoginPage";
import { RestaurantPage } from "../../pages/restaurant/RestaurantPage";
import RestaurantsPage from "../../pages/restaurant/RestaurantsPage";
import SignupPage from "../../pages/signup/SignupPage";
import Layout from "./Layout";
import PersistAuth from "./PersistAuth";
import RequireAuth from "./RequireAuth";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<PersistAuth />}>
                    {/* protected routes */}
                    <Route element={<RequireAuth allowedRoles={["ADMIN", "DEFAULT"]} />} >
                        <Route path="/restaurants" element={<RestaurantsPage />} />
                        <Route path="/restaurant/:id" element={<RestaurantPage />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} >
                        <Route path="/admin" element={<AdminPage />} />
                    </Route>
                </Route>

                {/* 404 not found */}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}