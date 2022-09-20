import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Principal from "../../models/Principal";
import User from "../../models/User";
import YOLP_API from "../../utils/ApiConfigs";
import "./AdminPage.css";

export default function Admin() {
    const [user, setUser] = useState<Principal | null>(null);
    const [token, setToken] = useState<string>("");
    const [userList, setUserList] = useState<User[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = window.sessionStorage.getItem("user");
        if (data !== null) setUser(JSON.parse(data));
        else navigate("/login");
    }, []);

    useEffect(() => {
        const data = window.sessionStorage.getItem("auth-token");
        if (data !== null) setToken(JSON.parse(data));
    }, []);

    async function getAllUsers() {
        await YOLP_API.get("/users", {
            headers: {
                "authorization": token
            }
        }).then(response => {
            setUserList(response.data);
        });
    }

    return (
        <>
            {userList ?
                <>
                    <h1 style={{ textAlign: "center" }}>All Users</h1>
                    <ul className="profile-list">
                        {userList.map(user => (
                            <li>
                                <span><strong>ID:</strong> {user.id}</span>
                                <span><strong>Username:</strong> {user.username}</span>
                                <span><strong>Password:</strong> {user.password}</span>
                                <span><strong>Role:</strong> {user.role}</span>
                            </li>
                        ))}
                    </ul>
                </>
                : <button onClick={getAllUsers}>View all users</button>}
        </>
    );
}