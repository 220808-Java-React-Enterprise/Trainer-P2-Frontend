import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import YOLP_API from "../../ApiConfig";
import Restaurant from "../../models/Restaurant";

export function RestaurantPage() {
    const { id } = useParams();
    const auth = useContext(AuthContext);
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState<string>("");
    const [resto, setResto] = useState<Restaurant | null>(null);

    const ratingChanged = (newRating: any) => {
        setRating(newRating);
    }

    useEffect(() => {
        getRestaurantById();
    }, []);

    async function getRestaurantById() {
        await YOLP_API.get("/restaurants/id", {
            headers: {
                "authorization": auth!.token
            },
            params: {
                "id": id
            }
        }).then((response) => {
            setResto(response.data);
        }).catch((error) => alert(error.response.data.message));
    }

    async function submit() {
        await YOLP_API.post("/reviews/add", {
            rating: rating,
            comment: comment,
            username: auth!.username,
            restaurant_id: id,
            user_id: auth!.id
        }, {
            headers: {
                "authorization": auth!.token
            }
        }).then(() => {
            alert("Review successfully submitted!");
        }).catch((error) => alert(error.response.data.message));
    }

    return (
        <>
            {resto ?
                resto.reviews.length ?
                    <>
                        <h1 className="text-center text-5xl m-20 font-medium">"{resto.name}"</h1>
                        <div className="">
                            <img className="shadow-xl mx-auto rounded-xl mb-36" src="https://images.unsplash.com/photo-1500868766630-f5477adf6f9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aW4lMjBuJTIwb3V0JTIwYnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
                            <ul className="flex justify-center gap-20 mb-20 mt-20">
                                {resto.reviews.map((r) => (
                                    <div className="shadow-xl p-5 rounded-sm bg-slate-50">
                                        <li><strong>Review: </strong>{r.comment}</li>
                                        <li><strong>Rating: </strong>{r.rating}</li>
                                        <li><strong>User: </strong>{r.username}</li>
                                        <br />
                                    </div>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col items-center">
                            <textarea className="mb-10 rounded-sm shadow-xl px-5 py-5 bg-slate-100" cols={50} rows={5} placeholder="Leave a review" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                            <br />
                            <button className="bg-black px-4 py-2 mb-36 rounded-md text-white font-medium shadow-xl" onClick={submit}>Submit</button>
                        </div>
                    </>
                    : <>
                        <h1 className="text-center text-5xl m-20 font-medium">"{resto.name}"</h1>
                        <div className="flex justify-center">
                            <h1 className="bg-slate-100 p-10 text-center text-2xl font-medium shadow-lg">No reviews yet</h1>
                        </div>
                    </>
                : <h1>Loading...</h1>}
        </>
    );
}