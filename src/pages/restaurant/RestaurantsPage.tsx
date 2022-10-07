import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import YOLP_API from "../../ApiConfig";
import Restaurant from "../../models/Restaurant";
import LoadingPage from "../loading/LoadingPage";

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
                    <div className="">
                        
                        <h1 className="text-center text-5xl m-20 font-medium">"Restaurants"</h1>
                        <ol className="lg:flex justify-center gap-28">
                            {restoList.map((r) => (
                                <Link to={`/restaurant/${r.id}`}>
                                    <div className="bg-gradient-to-b from-gray-300 shadow-xl text-center p-10">
                                        <h3 className="text-2xl"><strong>"{r.name}"</strong></h3>
                                        <h3 className="pt-10">{r.street}</h3>
                                        <h3 className="">{r.city} {r.state}</h3>
                                        <h3>{r.zipcode}</h3>
                                    </div>
                                </Link>
                            ))}
                        </ol>
                    </div>
                </>
                : <LoadingPage />}
        </>
    );
}