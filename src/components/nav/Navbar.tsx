import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, SetAuthContext } from "../../context/AuthProvider";

export default function Navbar() {
    const auth = useContext(AuthContext);
    const setAuth = useContext(SetAuthContext);
    const navigate = useNavigate();

    function logout() {
        setAuth!(null);
        window.sessionStorage.removeItem("auth");
        alert("You are now logged out");
        navigate("/");
    }

    return (
        <nav className=" p-4">
            <ul className="flex justify-between text-black">
                <div className="flex mt-1">
                    <li className="px-2"><Link to={"/"}>Home</Link></li>
                    <li className="px-2"><Link to={"/restaurants"}>Restaurants</Link></li>
                </div>
                <div className="flex">
                    {
                        auth ?
                            <>
                                <h1 className="font-medium mr-10 mt-1">{auth.username}</h1>
                                <button className="text-black" onClick={logout}>Log out</button>
                            </>
                            : <Link to={"/account/login"} >Login</Link>
                    }
                </div>
            </ul>
        </nav>
    );
}