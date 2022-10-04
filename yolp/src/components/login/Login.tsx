import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import YOLP_API from "../../ApiConfig";
import { PasswordRegex, UsernameRegex } from "../regex/Regex";
import { SetAuthContext } from "../../context/AuthProvider";
import Auth from "../../models/Auth";

export default function LoginPage() {
    const setAuth = useContext(SetAuthContext);
    const navigate = useNavigate();
    const [loginUsername, setLoginUsername] = useState<string>("");
    const [loginPassword, setLoginPassword] = useState<string>("");
    const [validUsername, setValidUsername] = useState<boolean>(true);
    const [validPassword, setValidPassword] = useState<boolean>(true);

    async function submit(e: any) {
        e.preventDefault();

        if (!UsernameRegex.test(loginUsername)) {
            setValidUsername(false);
            console.log(validUsername)
            return;
        } else setValidUsername(true);

        if (!PasswordRegex.test(loginPassword)) {
            setValidPassword(false);
            return;
        } else setValidPassword(true);

        await YOLP_API.post("/auth", {
            username: loginUsername,
            password: loginPassword
        }).then((resp) => {
            let auth = new Auth(resp.data.id, resp.data.username, resp.data.role, resp.headers["authorization"]);
            window.sessionStorage.setItem("auth", JSON.stringify(auth));
            setAuth!(auth);
            navigate("/");
        }).catch((error) => alert(error.response.data.message));

        setLoginUsername("");
        setLoginPassword("");
    }

    return (
        <>
            {/* parent div of login and signup */}
            <div className="lg:flex px-10">

                {/* login */}
                <div className="flex-col">
                    <h2 className="text-sm">SIGN IN TO YOUR ACCOUNT</h2>
                    <form onSubmit={(e) => submit(e)} role="alert" >
                        <div className="flex flex-col gap-1">
                            <input className="px-4 py-2 mt-5 mb-1 w-96 shadow-xl bg-slate-200 rounded-sm" type="text" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                            {!validUsername && <span className="text-sm text-blue-500" role="alert">Please enter a valid username</span>}
                        </div>


                        <div className="flex flex-col">
                            <input className="px-4 py-2 mt-5 mb-5 w-96 shadow-xl bg-slate-200 rounded-sm" type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                            {!validPassword && <span className="text-sm text-blue-500" role="alert">Please enter a valid password</span>}
                        </div>
                        <br />

                        <div className="flex gap-20">
                            <div className="flex gap-2">
                                <input className="border-black" type="checkbox" />
                                <label className="text-sm">Stay signed in</label>
                            </div>
                            <Link to={"/account/forgotpassword"} className="text-sm">
                                <span>I forgot my password</span>
                            </Link>
                        </div>
                        <button className="bg-gray-800 text-white mt-5 mb-10 px-4 py-2 rounded-md text-xs">SIGN IN</button>
                    </form>
                </div>
            </div>
        </>
    );
}