import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, SetAuthContext } from "../../context/AuthProvider";
import "./Navbar.css";

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
        <div className="navbar">
            <ul className="horizontal">
                <div className="nav-left">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/restaurants"}>Restaurants</Link></li>
                </div>
                <div className="nav-right">
                    {!auth ? <li><Link to={"/login"}>Login</Link></li> : <li><Link to={"/"} onClick={logout}>Log Out</Link></li>}
                    <li><Link to={"/admin"}>Admin</Link></li>
                </div>
            </ul>
        </div>
    );
}