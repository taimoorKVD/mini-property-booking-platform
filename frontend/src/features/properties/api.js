import {axiosInstance} from "../../lib/axios";

export const propertiesApi = {
    list: (params) =>
        axiosInstance
            .get("/properties", {params})
            .then((res) => res.data),

    get: (id) =>
        axiosInstance
            .get(`/properties/${id}`)
            .then((res) => res.data),

    create: (payload) =>
        axiosInstance
            .post("/properties", payload)
            .then((res) => res.data),

    update: (id, payload) =>
        axiosInstance
            .put(`/properties/${id}`, payload)
            .then((res) => res.data),

    remove: (id) =>
        axiosInstance
            .delete(`/properties/${id}`)
            .then((res) => res.data),
};
