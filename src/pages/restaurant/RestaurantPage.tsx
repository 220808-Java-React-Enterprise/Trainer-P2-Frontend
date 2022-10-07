import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { FaStar, FaUser } from "react-icons/fa";
import YOLP_API from "../../ApiConfig";
import Restaurant from "../../models/Restaurant";
import Rating from "../../components/rating/Rating";
import LoadingPage from "../loading/LoadingPage";

export function RestaurantPage() {
    const { id } = useParams();
    const auth = useContext(AuthContext);
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState<string>("");
    const [resto, setResto] = useState<Restaurant | null>(null);

    useEffect(() => {
        getRestaurantById();
    });

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

    async function submit(e: any) {
        e.preventDefault();

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
            window.location.reload();
        }).catch((error) => alert(error.response.data.message));
    }

    return (
        <>
            {resto ?
                resto.reviews.length ?
                    <>
                        <h1 className="text-center text-5xl m-20 font-medium">"{resto.name}"</h1>
                        <div className="">
                            <img className="shadow-xl mx-auto rounded-xl mb-36" src={resto.img} alt="" />
                            <ul className="flex flex-wrap justify-center p-10 gap-20 mb-20 mt-20">
                                {resto.reviews.map((r) => (
                                    <div className="shadow-xl p-5 rounded-sm bg-slate-50">
                                        <li className="flex font-bold gap-3"><FaUser />{r.username}</li>
                                        <li className="mt-5"><strong>Review: </strong>{r.comment}</li>
                                        <li className="flex gap-1"><strong>Rating: </strong><FaStar className="mt-1" color="#ffc107" />{r.rating}</li>
                                        <br />
                                    </div>
                                ))}
                            </ul>
                        </div>

                        <form onSubmit={(e) => submit(e)} className="flex flex-col items-center gap-10" >
                            <Rating updateRating={setRating} />
                            <textarea className="rounded-sm shadow-xl px-5 py-5 bg-slate-100" cols={50} rows={5} placeholder="Leave a review" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                            <br />
                            <button className="bg-black px-4 py-2 mb-36 rounded-md text-white font-medium shadow-xl">Submit</button>
                        </form>
                    </>
                    : <>
                        <h1 className="text-center text-5xl m-20 font-medium">"{resto.name}"</h1>
                        <img className="shadow-xl mx-auto rounded-xl mb-36" src={resto.img} alt="" />
                        <div className="flex justify-center mb-16">
                            <h1 className="bg-slate-100 p-10 text-center text-2xl font-medium shadow-lg">No reviews yet</h1>
                        </div>

                        <form onSubmit={(e) => submit(e)} className="flex flex-col items-center gap-10" >
                            <Rating updateRating={setRating} />
                            <textarea className="rounded-sm shadow-xl px-5 py-5 bg-slate-100" cols={50} rows={5} placeholder="Leave a review" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                            <br />
                            <button className="bg-black px-4 py-2 mb-36 rounded-md text-white font-medium shadow-xl">Submit</button>
                        </form>
                    </>
                : <LoadingPage />}
        </>
    );
}