import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css"

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password1, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [focusedUsername, setFocusedUsername] = useState(false);
    const [focusedPassword, setFocusedPassword] = useState(false);
    const [confirmFocusedPassword, confirmSetFocusedPassword] = useState(false);
    const navigate = useNavigate();

    /* callback function */
    function updateUsername(e: any) {
        if (e.target.value != "") {
            setFocusedUsername(true);
        } else {
            setFocusedUsername(false);
        }
        setUsername(e.target.value);
    }

    /* callback function */
    function updatePassword(e: any) {
        if (e.target.value != "") {
            setFocusedPassword(true);
        } else {
            setFocusedPassword(false);
        }
        setPassword(e.target.value);
    }

    /* callback function */
    function confirmPassword(e: any) {
        if (e.target.value != "") {
            confirmSetFocusedPassword(true);
        } else {
            confirmSetFocusedPassword(false);
        }
        setPassword2(e.target.value);
    }

    /* callback function */
    function handleException(response: Response) {
        if (response.ok) {
            alert("Account created successfully!");
            navigate("/login");
        }
        else {
            response.json().then(data => alert(data.message));
        }
    }

    function submit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password1: password1,
                password2: password2
            })
        }

        console.log("REQUEST" + request);

        fetch("http://localhost:8080/yolp/users/signup", request)
            .then(response => handleException(response));

        setUsername("");
        setPassword("");
        setPassword2("");
    }

    function updateFocused(event: any) {
        console.log(event)
        event.stopPropagation();
        console.log(event);
    }

    return (
        <div className="login-container">
            <div className="title">Register</div>
            <div className={focusedUsername ? "fluid-input fluid-input--focus" : "fluid-input"} style={{ margin: "15px 0px" }}>
                <div className="fluid-input-holder">
                    <input id="name" className="fluid-input-input " type="text" value={username} onChange={updateUsername}></input>
                    <label className="fluid-input-label">
                        Username
                    </label>
                </div>
            </div>
            <div className={focusedPassword ? "fluid-input fluid-input--focus" : "fluid-input"} style={{ margin: "15px 0px" }}>
                <div className="fluid-input-holder">
                    <input id="name" className="fluid-input-input " type="password" value={password1} onChange={updatePassword}></input>
                    <label className="fluid-input-label">
                        Password
                    </label>
                </div>
            </div>
            <div className={confirmFocusedPassword ? "fluid-input fluid-input--focus" : "fluid-input"} style={{ margin: "15px 0px" }}>
                <div className="fluid-input-holder">
                    <input id="name" className="fluid-input-input " type="password" value={password2} onChange={confirmPassword}></input>
                    <label className="fluid-input-label">
                        Confirm Password
                    </label>
                </div>
            </div>
            <div className="button login-button" onClick={submit}>
                Register
            </div>
        </div>
    );
}