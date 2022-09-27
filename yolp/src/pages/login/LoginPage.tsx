import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SetAuthContext } from "../../context/AuthProvider";
import YOLP_API from "../../ApiConfig";
import Auth from "../../models/Auth";
import "./LoginPage.css";


export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const setAuth = useContext(SetAuthContext);
    const navigate = useNavigate();

    async function login() {
        await YOLP_API.post("/users/auth", {
            username: username,
            password: pwd
        }).then((response) => {
            let auth = new Auth(response.data.id, response.data.username, response.data.role, response.headers["authorization"]);
            setAuth!(auth);     
            alert("Login successful!");
            navigate("/");
        }).catch((error) => alert(error.response.data.message));
    }

    return (
        <div className="login-form">
            <h1>Log In</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <input type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
            <br />
            <button onClick={login}>Log In</button>
            <br />
            <Link to={"/signup"}>New User?</Link>
        </div>
    );
}