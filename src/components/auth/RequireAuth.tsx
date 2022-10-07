import { useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

interface RoleProp {
    allowedRoles: string[];
}

export default function RequireAuth({ allowedRoles }: RoleProp) {
    const auth = useContext(AuthContext);
    const location = useLocation();


    function find(): boolean {
        for (let role of allowedRoles) {
            if (auth?.role === role) return true;
        }
        return false;
    }

    return (
        auth ? (find() ? <Outlet /> : <Navigate to={"/unathorized"} state={{ from: location }} replace />) : <Navigate to={"/account/login"} state={{ from: location }} replace />
    );
}