import { useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../models/User";
import YOLP_API from "../../utils/ApiConfigs";
import "./Login.css";

interface UserProp {
    currentUser: User | null;
    updateCurrentUser: Function;
}

/*
 * export default: a module is a self contained unit that can expose assets to other modules using export, and acquire assets from other modules using import. 
 */
export default function Login({ currentUser, updateCurrentUser }: UserProp) {
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

    function submit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        YOLP_API.post("/users/auth", {
            username: username,
            password: password
        })
            .then((obj) => {
                let user = new User(obj.data.id, obj.data.username, obj.data.role);
                window.sessionStorage.setItem("user", JSON.stringify(user));
                
                navigate("/restaurant");
            })
            .catch(error => {
                alert(error.response.data.message);
            });

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
                        <button type="submit">Log In</button>
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <a href="#" onClick={() => navigate("/signup")} >Create Account</a>
                        </div>
                    </form>
                </div >
            </body >
        </>
    );
}