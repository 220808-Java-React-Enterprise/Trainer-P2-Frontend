import axios from "axios";
import { useState } from "react";

const YOLP_API = axios.create({
    baseURL: "http://localhost:8080/yolp"
})

YOLP_API.interceptors.request.use((request: any) => {
    request.headers.common["Accept"] = "application/json";
    return request;
}, (error) => {
    return Promise.reject(error);
});

YOLP_API.interceptors.response.use((response: any) => {
    return response;
}, (error) => {
    alert(error.response.data.message);
});

export default YOLP_API;