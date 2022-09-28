import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import YOLP_API from "../../ApiConfig";
import Restaurant from "../../models/Restaurant";
import "./RestaurantPage.css";

export function RestaurantPage() {
    const { id } = useParams();
    const auth = useContext(AuthContext);
    const [review, setReview] = useState<string>("");
    const [resto, setResto] = useState<Restaurant | null>(null);

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

    }

    return (
        <>
            {resto ?
                resto.reviews.length ?
                    <>
                        <div className="resto">
                            <h1>{resto.name}</h1>
                            <h2>Location: {resto.city} {resto.state} {resto.zipcode}</h2>
                            <hr />
                            <ul>
                                {resto.reviews.map((r) => (
                                    <div className="resto-review">
                                        <li><strong>Review: </strong>{r.comment}</li>
                                        <li><strong>Rating: </strong>{r.rating}</li>
                                        <li><strong>User: </strong>{r.username}</li>
                                    </div>
                                ))}
                            </ul>
                            <textarea className="review-textarea" cols={50} rows={5} placeholder="Leave a review" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                            <br />
                            <button>Submit</button>
                        </div>
                    </>
                    : <div className="resto">
                        <h1>No reviews yet!</h1>
                        <textarea className="review-textarea" cols={50} rows={5} placeholder="Leave a review" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                        <br />
                        <button>Submit</button>
                    </div>
                : <h1>Loading...</h1>}
        </>
    );
}