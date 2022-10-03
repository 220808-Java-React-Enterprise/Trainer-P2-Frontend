import { useState, useContext } from "react";
import { SetAuthContext } from "../../context/AuthProvider";
import YOLP_API from "../../ApiConfig";
import Auth from "../../models/Auth";

interface LoginModalProp {
    closeLoginModal: Function;
    openSignup: Function;
}

export default function Modal({ closeLoginModal, openSignup }: LoginModalProp) {
    const [username, setUsername] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const setAuth = useContext(SetAuthContext);

    async function login() {
        await YOLP_API.post("/auth", {
            username: username,
            password: pwd
        }).then((response) => {
            let auth = new Auth(response.data.id, response.data.username, response.data.role, response.headers["authorization"]);
            window.sessionStorage.setItem("auth", JSON.stringify(auth));
            setAuth!(auth);
            alert("Login successful!");
            closeLoginModal(false);
        }).catch((error) => alert(error.response.data.message));
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => closeLoginModal(false)}>
            <div className="flex justify-center">
                <div className="flex flex-col items-center bg-gradient-to-b from-cyan-900 to-gray-100 rounded-xl p-5 m-11 text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                    <h1 className="p-10 text-center text-4xl">Login Account</h1>

                    <div>
                        <label className="text-left">Username</label>
                        <br />
                        <input className="mb-5 rounded-sm  text-black shadow-xl" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input className="mb-4 rounded-sm shadow-xl text-black" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    </div>

                    <button className="m-5 bg-gradient-to-r from-green-700 to-green-500 px-4 py-2 rounded-md" onClick={login}>Log In</button>
                    <a href="#" className="text-blue-500" onClick={() => {
                        closeLoginModal(false);
                        openSignup(true);
                    }}>New user?</a>
                </div>
            </div>
        </div>
    );
}