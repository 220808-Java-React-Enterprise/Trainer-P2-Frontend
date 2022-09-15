
import { useNavigate } from "react-router-dom";
import User from "../../models/User";
import "./Navbar.css";

interface UserProp {
    currentUser: User | null;
}
export default function Navbar({ currentUser }: UserProp) {
    const navigate = useNavigate();

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
                            <li><a href="#" onClick={() => navigate("/")}>Home</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Restaurants</a></li>
                            <li><a href="#">About</a></li>
                        </ul>
                    </nav>
                    {currentUser ? <a className="cta" onClick={logout}>Log Out</a>
                        : <a className="cta" onClick={() => navigate("/login")}>Log In</a>}
                    <p className="menu cta">Menu</p>
                </header>
                <div id="mobile__menu" className="overlay">
                    <a className="close">&times;</a>
                    <div className="overlay__content">
                        <a href="#">Services</a>
                        <a href="#">Projects</a>
                        <a href="#">About</a>
                    </div>
                </div>
            </body>
        </>
    );
}