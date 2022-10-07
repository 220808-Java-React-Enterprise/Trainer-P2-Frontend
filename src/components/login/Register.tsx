import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import YOLP_API from "../../ApiConfig";
import { SetAuthContext } from "../../context/AuthProvider";
import Auth from "../../models/Auth";
import { UsernameRegex, PasswordRegex } from "../regex/Regex";

export default function Register() {
    const navigate = useNavigate();
    const setAuth = useContext(SetAuthContext);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfrimPassword] = useState<string>("");
    const [validUsername, setValidUsername] = useState<boolean>(true);
    const [validPassword, setValidPassword] = useState<boolean>(true);
    const [validConfirmPassword, setValidConfirmPassword] = useState<boolean>(true);

    async function submit(e: any) {
        e.preventDefault();

        if (!UsernameRegex.test(username)) {
            setValidUsername(false);
            console.log(validUsername)
            return;
        } else setValidUsername(true);

        if (!PasswordRegex.test(password)) {
            setValidPassword(false);
            return;
        } else setValidPassword(true);

        if (password !== confirmPassword) {
            setValidConfirmPassword(false);
            return;
        } else setValidConfirmPassword(true);

        await YOLP_API.post("/users/signup", {
            username: username,
            password1: password,
            password2: confirmPassword
        }).then((resp) => {
            login();
            navigate("/");
        }).catch((error) => alert(error.response.data.message));

        setUsername("");
        setPassword("");
        setConfrimPassword("");
    }

    async function login() {
        await YOLP_API.post("/auth", {
            username: username,
            password: password
        }).then((resp) => {
            let auth = new Auth(resp.data.id, resp.data.username, resp.data.role, resp.headers["authorization"]);
            window.sessionStorage.setItem("auth", JSON.stringify(auth));
            setAuth!(auth);
        }).catch((error) => alert(error.response.data.message));
    }

    return (
        <div className="lg:flex flex-col px-10">
            <h2 className="text-sm">REGISTER A NEW ACCOUNT</h2>

            <form onSubmit={(e) => submit(e)}>
                <div className="flex flex-col gap-1 mb-5">
                    <input className="px-4 py-2 w-96 mt-5 shadow-xl bg-slate-200 rounded-sm" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {!validUsername && <span className="text-sm text-blue-500" role="alert">Please enter a valid username</span>}
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <input className="px-4 py-2 w-96 shadow-xl bg-slate-200 rounded-sm" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {!validPassword && <span className="text-sm text-blue-500" role="alert">Please enter a valid password</span>}
                </div>

                <div className="flex flex-col gap-1 mb-5">
                    <input className="px-4 py-2 w-96 shadow-xl bg-slate-200 rounded-sm" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfrimPassword(e.target.value)} />
                    {!validConfirmPassword && <span className="text-sm text-blue-500" role="alert">Password do not match</span>}
                </div>

                <button className="bg-gray-800 text-white mt-2 px-4 py-2 rounded-md text-xs">CREATE ACCOUNT</button>
            </form>
        </div>
    );
}