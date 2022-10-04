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
                        <div className="bg-gradient-to-b from-gray-400 p-10 m-20 shadow-2xl rounded-sm">
                            <h1 className="text-center text-5xl m-20 font-medium">"{resto.name}"</h1>
                            <div className="">
                                <ul className="flex justify-center gap-20 mb-20">
                                    {resto.reviews.map((r) => (
                                        <div className="shadow-xl p-5 rounded-sm">
                                            <li><strong>Review: </strong>{r.comment}</li>
                                            <li><strong>Rating: </strong>{r.rating}</li>
                                            <li><strong>User: </strong>{r.username}</li>
                                            <br />
                                        </div>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col items-center">
                                <textarea className="mb-10 rounded-sm" cols={50} rows={5} placeholder="Leave a review" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                <br />
                                <button className="bg-blue-500 px-4 py-2 rounded-md text-white font-medium" onClick={submit}>Submit</button>
                            </div>
                        </div>

                    </>
                    : <h1>No reviews yet!</h1>
                : <h1>Loading...</h1>}
        </>
    );
}