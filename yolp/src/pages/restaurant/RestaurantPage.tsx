import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import YOLP_API from "../../ApiConfig";
import Restaurant from "../../models/Restaurant";
import "./RestaurantPage.css";

export function RestaurantPage() {
    const { id } = useParams();
    const auth = useContext(AuthContext);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
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
                        <div className="resto">
                            <h1>{resto.name}</h1>
                            <h2>Location: {resto.city} {resto.state} {resto.zipcode}</h2>
                            <br />
                            <ul className="list-container">
                                {resto.reviews.map((r) => (
                                    <div>
                                        <li><strong>Review: </strong>{r.comment}</li>
                                        <li><strong>Rating: </strong>{r.rating}</li>
                                        <li><strong>User: </strong>{r.username}</li>
                                        <br />
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <div className="rate">
                            <input type="radio" id="star5" name="rate" value={rating} onClick={() => setRating(5)} />
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value={4} onClick={() => setRating(4)} />
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value={3} onClick={() => setRating(3)} />
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value={2} onClick={() => setRating(2)} />
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value={1} onClick={() => setRating(1)} />
                            <label htmlFor="star1" title="text">1 star</label>
                        </div>
                        <br />
                        <br />
                        <br />
                        <textarea className="review-textarea" cols={50} rows={5} placeholder="Leave a review" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <br />
                        <button onClick={submit}>Submit</button>

                    </>
                    : <div className="resto">
                        <h1>No reviews yet!</h1>
                        <div className="rate">
                            <input type="radio" id="star5" name="rate" value={rating} onClick={() => setRating(5)} />
                            <label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value={4} onClick={() => setRating(4)} />
                            <label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value={3} onClick={() => setRating(3)} />
                            <label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value={2} onClick={() => setRating(2)} />
                            <label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value={1} onClick={() => setRating(1)} />
                            <label htmlFor="star1" title="text">1 star</label>
                        </div>
                        <textarea className="review-textarea" cols={50} rows={5} placeholder="Leave a review" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <br />
                        <button onClick={submit}>Submit</button>
                    </div>
                : <h1>Loading...</h1>}
        </>
    );
}