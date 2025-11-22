import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertiesApi } from "./api";

export const useProperties = (filters) =>
    useQuery({
        queryKey: ["properties", filters],
        queryFn: () => propertiesApi.list(filters),
    });

export const useProperty = (id) =>
    useQuery({
        queryKey: ["property", id],
        queryFn: () => propertiesApi.get(id),
        enabled: !!id,
    });

export const useCreateProperty = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: propertiesApi.create,
        onSuccess: () => {
            qc.invalidateQueries(["properties"]);
        },
    });
};

export const useUpdateProperty = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => propertiesApi.update(id, payload),
        onSuccess: (_, { id }) => {
            qc.invalidateQueries(["properties"]);
            qc.invalidateQueries(["property", id]);
        },
    });
};

export const useDeleteProperty = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: propertiesApi.remove,
        onSuccess: () => {
            qc.invalidateQueries(["properties"]);
        },
    });
};
