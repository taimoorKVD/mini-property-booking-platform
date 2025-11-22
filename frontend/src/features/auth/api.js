import { axiosInstance } from "../../lib/axios";

export const authApi = {
    login: (payload) =>
        axiosInstance.post("/login", payload).then((res) => res.data),
    register: (payload) =>
        axiosInstance.post("/register", payload).then((res) => res.data),
    me: () => axiosInstance.get("/me").then((res) => res.data),
    logout: () => axiosInstance.post("/logout").then((res) => res.data),
};
