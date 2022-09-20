import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../models/User";

export default function Admin() {
    const[user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = window.sessionStorage.getItem("user");
        if (data !== null) setUser(JSON.parse(data));
        else navigate("/login");
      }, []);

    return (
        <button className="admin-button">View all users</button>
    );
}