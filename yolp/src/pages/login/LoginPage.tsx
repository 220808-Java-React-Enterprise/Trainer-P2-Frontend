import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Principal from "../../models/Principal";
import YOLP_API from "../../utils/ApiConfigs";
import "./LoginPage.css";

interface UserProp {
    setCurrentUser: Function;
    setToken: Function;
}
/*
 * export default: a module is a self contained unit that can expose assets to other modules using export, and acquire assets from other modules using import. 
 */
export default function Login({ setCurrentUser, setToken }: UserProp) {
    /* 
     * What is a Hook? A Hook is a special function that lets you “hook into” React features. 
     * For example, useState is a Hook that lets you add React state to function components.
     */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function updateUsername(event: any) {
        setUsername(event.target.value);
    }

    function updatePassword(event: any) {
        setPassword(event.target.value);
    }

    async function submit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        await YOLP_API.post("/users/auth", {
            username: username,
            password: password
        }).then((response) => {
            let user = { ...response.data };
            let token = response.headers["authorization"];
            window.sessionStorage.setItem("user", JSON.stringify(user));
            window.sessionStorage.setItem("auth-token", JSON.stringify(response.headers["authorization"]));
            setCurrentUser(user);
            setToken(token);
            alert("Login successful!");
            navigate("/");
        }).catch(error => {
            alert(error.response.data.message);
        })

        setUsername("");
        setPassword("");
    }

    return (
        <>
            <body>
                <div>
                    <div className="login-background">
                        <div className="login-shape"></div>
                        <div className="login-shape"></div>
                    </div >
                    <form className="login" onSubmit={submit}>
                        <h3>Log In</h3>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Username" id="username" value={username} onChange={updateUsername} />

                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" id="password" value={password} onChange={updatePassword} />
                        <button className="login-button" type="submit">Log In</button>
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <Link to={"/signup"}>Create Account</Link>
                        </div>
                    </form>
                </div >
            </body >
        </>
    );
}