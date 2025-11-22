import {axiosInstance} from "../../lib/axios";

export const bookingsApi = {
    list: (params) =>
        axiosInstance
            .get("/bookings", {params})
            .then((res) => res.data),
    create: (payload) =>
        axiosInstance.post("/bookings", payload).then((res) => res.data),
    updateStatus: ({id, status}) =>
        axiosInstance
            .put(`/bookings/${id}/status`, {status})
            .then((res) => res.data),
};
