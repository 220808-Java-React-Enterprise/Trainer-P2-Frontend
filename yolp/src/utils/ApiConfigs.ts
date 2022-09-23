import axios from "axios";
import { useState } from "react";

const YOLP_API = axios.create({
    baseURL: "http://localhost:8080/yolp",
    headers: {
        "Accept": "application/json"
    }
})

export default YOLP_API;