import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { availabilityApi } from "./api";

export const useAvailability = (propertyId) =>
    useQuery({
        queryKey: ["availability", propertyId],
        queryFn: () => availabilityApi.list(propertyId),
        enabled: !!propertyId,
    });

export const useCreateAvailability = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: availabilityApi.create,
        onSuccess: (_, { propertyId }) => {
            qc.invalidateQueries(["availability", propertyId]);
        },
    });
};

export const useDeleteAvailability = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: availabilityApi.remove,
        onSuccess: (_, { propertyId }) => {
            qc.invalidateQueries(["availability", propertyId]);
        },
    });
};
