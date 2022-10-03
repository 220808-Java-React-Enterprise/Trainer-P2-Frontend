import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, SetAuthContext } from "../../context/AuthProvider";
import LoginModal from "../modal/LoginModal";
import SignupModal from "../modal/SignupModal";

export default function Navbar() {
    const auth = useContext(AuthContext);
    const setAuth = useContext(SetAuthContext);
    const navigate = useNavigate();
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [signupModal, setSignupModal] = useState<boolean>(false);

    function logout() {
        setAuth!(null);
        window.sessionStorage.removeItem("auth");
        alert("You are now logged out");
        navigate("/");
    }

    return (
        <nav className="bg-gradient-to-r from-gray-800 to-gray-600 p-4">
            <ul className="flex justify-between text-white">
                <div className="flex mt-2">
                    <li className="px-2"><Link to={"/"}>Home</Link></li>
                    <li className="px-2"><Link to={"/restaurants"}>Restaurants</Link></li>
                </div>
                <div className="flex">
                    {
                        auth ?
                            <>
                                <h1 className="mr-10 mt-2">{auth.username}</h1>
                                <button className="bg-gradient-to-r from-cyan-600 to-teal-500 px-4 py-2 rounded-md" onClick={logout}>Log out</button>
                            </>
                            : <button className="bg-gradient-to-r from-cyan-600 to-teal-500 px-4 py-2 rounded-md" onClick={() => setLoginModal(true)}>Log in</button>
                    }
                    {loginModal && <LoginModal closeLoginModal={setLoginModal} openSignup={setSignupModal} />}
                    {signupModal && <SignupModal closeSignupModal={setSignupModal} openLogin={setLoginModal} />}
                </div>
            </ul>
        </nav>
    );
}