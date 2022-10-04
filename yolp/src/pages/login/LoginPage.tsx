import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import YOLP_API from "../../ApiConfig";
import { PasswordRegex, UsernameRegex } from "../../components/regex/Regex";
import { SetAuthContext } from "../../context/AuthProvider";
import Auth from "../../models/Auth";

export default function LoginPage() {
    const setAuth = useContext(SetAuthContext);
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
        }

        await YOLP_API.post("/auth", {
            username: loginUsername,
            password: loginPassword
        }).then((response) => {
            console.log(response);

        }).catch((error) => console.log(error));

        setLoginUsername("");
        setLoginPassword("");
    }

    return (
        <div>
            <h1 className="text-center font-medium text-5xl m-20">"Login | Register"</h1>

            {/* parent div of login and signup */}
            <div className="lg:flex p-5 gap-32">

                {/* login */}
                <div className="flex-col">
                    <h2 className="text-sm">SIGN IN TO YOUR ACCOUNT</h2>
                    <form onSubmit={(e) => submit(e)} role="alert" >
                        <div className="flex flex-col gap-1">
                            <input className="px-4 py-2 mt-5 mb-1 shadow-xl bg-slate-200 rounded-sm" type="text" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                            {!validUsername && <span className="text-sm text-blue-500" role="alert">Please enter a valid username</span>}
                        </div>

                 
                        <div className="flex flex-col">
                            <input className="px-4 py-2 mt-5 mb-5 shadow-xl bg-slate-200 rounded-sm" type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
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

                        <br />

                        <button className="bg-gray-800 text-white px-3 py-2 rounded-md text-xs">SIGN IN</button>
                    </form>
                </div>

                {/* signup */}
                <div className="flex flex-col">
                    <h2>REGISTER A NEW ACCOUNT</h2>
                </div>
            </div>
        </div>
    );
}