import { useState } from "react";
import { useNavigate } from "react-router-dom";
import YOLP_API from "../../utils/ApiConfig";
import "./Signup.css"

/*
 * export default: a module is a self contained unit that can expose assets to other modules using export, and acquire assets from other modules using import. 
 */
export default function Signup() {
    /* 
     * What is a Hook? A Hook is a special function that lets you “hook into” React features. 
     * For example, useState is a Hook that lets you add React state to function components.
     */
    const [username, setUsername] = useState("");
    const [password1, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    function updateUsername(e: any) {
        setUsername(e.target.value);
    }

    function updatePassword(e: any) {
        setPassword(e.target.value);
    }

    function confirmPassword(e: any) {
        setPassword2(e.target.value);
    }

    function submit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        YOLP_API.post("/users/signup", {
            username: username,
            password1: password1,
            password2: password2
        })
            .then(() => {
                alert("Account created successfully!");
                navigate("/login");
            })
            .catch(error => alert(error.response.data.message));

        setUsername("");
        setPassword("");
        setPassword2("");
    }

    return (
        <>
            <head>
                <link rel="stylesheet" href="https://fonts.gstatic.com" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" />
            </head>
            <div className="register">
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                <form onSubmit={submit}>
                    <h3>Register</h3>

                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Username" id="username" value={username} onChange={updateUsername} />

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" id="password" value={password1} onChange={updatePassword} />

                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" id="password" value={password2} onChange={confirmPassword} />

                    <button type="submit">Create Account</button>
                </form>
            </div>
        </>
    );
}