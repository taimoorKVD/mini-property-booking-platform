import { axiosInstance } from "../../lib/axios";

export const availabilityApi = {
    list: (propertyId) =>
        axiosInstance
            .get(`/properties/${propertyId}/availabilities`)
            .then((res) => res.data),
    create: ({ propertyId, payload }) =>
        axiosInstance
            .post(`/properties/${propertyId}/availabilities`, payload)
            .then((res) => res.data),
    remove: ({ propertyId, id }) =>
        axiosInstance
            .delete(`/properties/${propertyId}/availabilities/${id}`)
            .then((res) => res.data),
};
