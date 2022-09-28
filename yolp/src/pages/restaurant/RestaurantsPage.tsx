import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import YOLP_API from "../../ApiConfig";
import Restaurant from "../../models/Restaurant";
import "./RestaurantsPage.css";

export default function RestaurantsPage() {
    const auth = useContext(AuthContext);
    const [restoList, setRestoList] = useState<Restaurant[] | null>(null);

    useEffect(() => {
        getRestaurantList();
    }, []);

    async function getRestaurantList() {
        await YOLP_API.get("/restaurants", {
            headers: {
                "authorization": auth!.token
            }
        }).then((response) => {
            setRestoList(response.data);
        }).catch((error) => alert(error.response.headers.data.message));
    }


    return (
        <>
            {restoList ?
                <>
                    <div className="resto-list">
                        <h1>Restaurants</h1>
                        <ol>
                            {restoList.map((r) => (
                                <Link to={`/restaurant/${r.id}`}><strong><li>{r.name}</li></strong></Link>
                            ))}
                        </ol>
                    </div>
                </>
                : <h1>Loading...</h1>}
        </>
    );
}