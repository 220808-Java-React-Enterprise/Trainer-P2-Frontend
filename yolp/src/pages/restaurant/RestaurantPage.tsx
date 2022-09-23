import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Principal from "../../models/Principal";
import Restaurant from "../../models/Restaurant";
import YOLP_API from "../../utils/ApiConfigs";
import "./RestaurantPage.css";

export default function RestaurantPage() {
    const [user, setUser] = useState<Principal | null>(null);
    const [restoList, setRestoList] = useState<Restaurant[] | null>(null);
    const [token, setToken] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const data = window.sessionStorage.getItem("user");
        if (data !== null) setUser(JSON.parse(data));
        else navigate("/login");
    }, []);

    useEffect(() => {
        const data = window.sessionStorage.getItem("auth-token");
        if (data !== null) {
            setToken(JSON.parse(data));
            getAllRestaurants(JSON.parse(data));
        }
        else navigate("/login");
    }, []);

    async function getAllRestaurants(token: string) {
        await YOLP_API.get("/restaurant", {
            headers: {
                "authorization": token
            }
        }).then(response => {
            setRestoList(response.data);
            console.log(response);
        }).catch(error => console.log(error));
    }

    return (
        <>
            {
                restoList ?
                    <>
                        <h1 style={{ textAlign: "center" }}>Restaurants</h1>
                        <ul className="resto-list">
                            {restoList.map(resto => (
                                <li>
                                    <span><strong>Name:</strong> {resto.name}</span>
                                </li>
                            ))}
                        </ul>
                    </> : <h1>Loading...</h1>
            }
        </>
    );
}