import axios from "axios";

const YOLP_API = axios.create({
    baseURL: "http://localhost:8080/yolp",
    headers: {
        "Content-type": "application/json"
    }
})

export default YOLP_API;