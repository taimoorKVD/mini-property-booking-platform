import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {bookingsApi} from "./api";

export const useBookings = (filters) =>
    useQuery({
        queryKey: ["bookings", filters],
        queryFn: () => bookingsApi.list(filters),
    });

export const useCreateBooking = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: bookingsApi.create,
        onSuccess: () => {
            qc.invalidateQueries(["bookings"]);
        },
    });
};

export const useUpdateBookingStatus = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: bookingsApi.updateStatus,
        onSuccess: () => {
            qc.invalidateQueries(["bookings"]);
        },
    });
};
