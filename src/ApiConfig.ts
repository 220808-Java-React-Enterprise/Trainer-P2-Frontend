import axios from "axios";

const YOLP_API = axios.create({
    baseURL: "http://yolpspringboot-env.eba-tibnxysm.us-west-1.elasticbeanstalk.com/yolp",
    headers: {
        "Content-Type": "application/json"
    }
});

export default YOLP_API;
