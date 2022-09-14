
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();

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
                    <a className="cta" onClick={() => navigate("/signup")}>Sign In</a>
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