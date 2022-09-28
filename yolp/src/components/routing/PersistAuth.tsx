import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext, SetAuthContext } from "../../context/AuthProvider";

export default function PersistAuth() {
    const auth = useContext(AuthContext);
    const setAuth = useContext(SetAuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const data = window.sessionStorage.getItem("auth");
        if (data !== null) {
            setAuth!({ ...JSON.parse(data) });
        } else navigate("/login")
    }, []);

    return (
        auth && <Outlet />
    );
}