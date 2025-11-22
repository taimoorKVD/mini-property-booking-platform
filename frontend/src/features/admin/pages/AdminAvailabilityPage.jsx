import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAvailability, useCreateAvailability, useDeleteAvailability } from "../../availability/hooks";
import { useProperty } from "../../properties/hooks";
import { PageContainer } from "../../../common/components/layout/PageContainer";
import { Button } from "../../../common/components/ui/Button";
import { Input } from "../../../common/components/ui/Input";

export const AdminAvailabilityPage = () => {
    const { id: propertyId } = useParams();
    const { data: property } = useProperty(propertyId);
    const { data: ranges, isLoading } = useAvailability(propertyId);
    const createAvailability = useCreateAvailability();
    const deleteAvailability = useDeleteAvailability();

    const [form, setForm] = useState({
        start_date: "",
        end_date: "",
    });

    const onChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        await createAvailability.mutateAsync({
            propertyId,
            payload: form,
        });
        setForm({ start_date: "", end_date: "" });
    };

    const onDelete = (rangeId) => {
        if (!window.confirm("Delete this availability range?")) return;
        deleteAvailability.mutate({ propertyId, id: rangeId });
    };

    const availabilities = ranges || [];

    return (
        <PageContainer className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">
                Availability – {property?.title || "Property"}
            </h1>

            <div className="grid gap-4 md:grid-cols-2">
                <form
                    onSubmit={onSubmit}
                    className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-3"
                >
                    <h2 className="text-sm font-semibold">Add availability range</h2>
                    <Input
                        label="Start date"
                        name="start_date"
                        type="date"
                        value={form.start_date}
                        onChange={onChange}
                        required
                    />
                    <Input
                        label="End date"
                        name="end_date"
                        type="date"
                        value={form.end_date}
                        onChange={onChange}
                        required
                    />
                    <Button type="submit" disabled={createAvailability.isLoading}>
                        {createAvailability.isLoading ? "Saving…" : "Add range"}
                    </Button>
                </form>

                <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <h2 className="text-sm font-semibold mb-2">Existing ranges</h2>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                        </div>
                    ) : availabilities.length === 0 ? (
                        <p className="text-sm text-slate-500">
                            No availability ranges yet.
                        </p>
                    ) : (
                        <ul className="space-y-2 text-sm">
                            {availabilities.map((a) => (
                                <li
                                    key={a.id}
                                    className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2"
                                >
                  <span>
                    {a.start_date} → {a.end_date}
                  </span>
                                    <button
                                        onClick={() => onDelete(a.id)}
                                        className="text-xs text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </PageContainer>
    );
};
