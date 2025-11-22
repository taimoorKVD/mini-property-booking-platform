import axios from "axios";
import {env} from "../config/env";

export const axiosInstance = axios.create({
    baseURL: env.API_URL,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
