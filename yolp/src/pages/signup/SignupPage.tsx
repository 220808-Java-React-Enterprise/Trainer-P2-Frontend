import React, { useState } from "react";
import YOLP_API from "../../utils/ApiConfigs";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css"

/*
 * export default: a module is a self contained unit that can expose assets to other modules using export, and acquire assets from other modules using import. 
 */
export default function Register() {
    /* 
     * What is a Hook? A Hook is a special function that lets you “hook into” React features. 
     * For example, useState is a Hook that lets you add React state to function components.
     */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    function updateUsername(event: any) {
        setUsername(event.target.value);
    }

    function updatePassword(event: any) {
        setPassword(event.target.value);
    }

    function confirmPassword(event: any) {
        setPassword2(event.target.value);
    }

    function submit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        YOLP_API.post("/users/signup", {
            username: username,
            password1: password,
            password2: password2
        })
            .then(() => {
                alert("Account created successfully!");
                navigate("/login");
            })
            .catch(error => {
                alert(error.response.data.message);
            });

        setUsername("");
        setPassword("");
        setPassword2("");
    }

    return (
        <>
            <body>
                <div>
                    <div className="background">
                        <div className="shape"></div>
                        <div className="shape"></div>
                    </div>
                    <form onSubmit={submit}>
                        <h3>Register</h3>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Username" id="username" value={username} onChange={updateUsername}/>

                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" id="password" value={password} onChange={updatePassword}/>

                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" id="password" value={password2} onChange={confirmPassword} />

                        <button className="signup-button" type="submit">Create Account</button>
                    </form>
                </div>
            </body>
        </>
    );

}