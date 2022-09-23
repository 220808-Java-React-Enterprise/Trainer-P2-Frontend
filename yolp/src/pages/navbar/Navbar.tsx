import { Link, useNavigate } from "react-router-dom";
import Principal from "../../models/Principal";
import "./Navbar.css";

interface UserProp {
    currentUser: Principal | null;
}

export default function Navbar({ currentUser }: UserProp) {
    const navigate = useNavigate();

    function logout() {
        window.sessionStorage.removeItem("user");
        window.sessionStorage.removeItem("auth-token");
        navigate("/");
    }

    return (
        <>
            <body>
                <header>
                    <nav>
                        <ul className="nav__links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Services</Link></li>
                            <li><Link to="/restaurant">Restaurants</Link></li>
                            <li><Link to="/admin">Admin</Link></li>
                            {currentUser ? <li><a href="" className="cta" onClick={logout}>Log Out</a></li> : <li><Link className="cta" to={"/login"}>Log In</Link></li>}
                        </ul>
                    </nav>
                </header>
            </body>
        </>
    );
}