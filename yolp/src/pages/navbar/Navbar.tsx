import { Link, useNavigate } from "react-router-dom";
import User from "../../models/User";
import "./Navbar.css";

interface UserProp {
    currentUser: User | null;
}

export default function Navbar({ currentUser }: UserProp) {
    const navigate = useNavigate();

    console.log(currentUser);

    function logout() {
        window.sessionStorage.removeItem("user");
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
                            <li><Link to="/">Restaurants</Link></li>
                            <li><Link to="/">About</Link></li>
                            {
                                currentUser ? <li><a href="" className="cta" onClick={logout}>Log Out</a></li> : <li><Link className="cta" to={"/login"}>Log In</Link></li>
                            }
                        </ul>
                    </nav>
                </header>
            </body>
        </>
    );
}