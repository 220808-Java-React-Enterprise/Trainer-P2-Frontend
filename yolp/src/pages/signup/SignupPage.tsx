import { useState } from "react";
import { useNavigate } from "react-router-dom";
import YOLP_API from "../../ApiConfig";
import "./SignupPage.css";

export default function SignupPage() {
    const [username, setUsername] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [confirmPwd, setConfirmPwd] = useState<string>("");
    const navigate = useNavigate();

    async function submit() {
        await YOLP_API.post("/users/signup", {
            username: username,
            password1: pwd,
            password2: confirmPwd
        }).then((response) => {
            alert("Account created successfully!");
            navigate("/login");
        }).catch((error) => alert(error.response.data.message));

        setUsername("");
        setPwd("");
        setConfirmPwd("");
    }

    return (
        <div className="signup-form">
            <h1>Signup</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <input type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
            <br />
            <input type="password" placeholder="Confirm Password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
            <br />
            <button onClick={submit}>Submit</button>
        </div>
    );
}