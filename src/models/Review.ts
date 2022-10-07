export default class Review {
    id: string;
    comment: string;
    rating: number;
    username: string;
    restaurant_id: string;
    user_id: string;

    constructor(id: string, comment: string, rating: number, username: string, restaurant_id: string, user_id: string) {
        this.id = id;
        this.comment = comment;
        this.rating = rating;
        this.username = username;
        this.restaurant_id = restaurant_id;
        this.user_id = user_id;
    }
}