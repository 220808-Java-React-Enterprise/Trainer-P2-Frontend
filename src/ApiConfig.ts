import axios from "axios";

const YOLP_API = axios.create({
    baseURL: "http://yolpspringboot-env-2.eba-tibnxysm.us-west-1.elasticbeanstalk.com/yolp",
    headers: {
        "Content-Type": "application/json"
    }
});

export default YOLP_API;