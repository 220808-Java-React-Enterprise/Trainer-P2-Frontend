import Review from "./Review";

export default class Restaurant {
    id: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    reviews: Review[];

    constructor(id: string, name: string, street: string, city: string, state: string, zipcode: string, reviews: Review[]) {
        this.id = id;
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.reviews = reviews;
    }
}