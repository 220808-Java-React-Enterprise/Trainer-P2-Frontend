import { Routes, Route } from "react-router-dom";
import { RestaurantPage } from "../../pages/restaurant/RestaurantPage";
import AdminPage from "../../pages/admin/AdminPage";
import ErrorPage from "../../pages/error/ErrorPage";
import HomePage from "../../pages/home/HomePage";
import RestaurantsPage from "../../pages/restaurant/RestaurantsPage";
import Layout from "./Layout";
import RequireAuth from "../auth/RequireAuth";
import LoginRegisterPage from "../../pages/login/LoginRegisterPage";

export default function Router() {    
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                {/* public routes */}
                <Route path="/account/login" element={<LoginRegisterPage />} />

                {/* protected routes */}
                <Route element={<RequireAuth allowedRoles={["ADMIN", "DEFAULT"]} />} >
                    <Route path="/restaurants" element={<RestaurantsPage />} />
                    <Route path="/restaurant/:id" element={<RestaurantPage />} />
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