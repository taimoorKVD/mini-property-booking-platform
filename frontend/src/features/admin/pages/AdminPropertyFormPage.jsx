import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateProperty,
    useProperty,
    useUpdateProperty,
} from "../../properties/hooks";
import { PageContainer } from "../../../common/components/layout/PageContainer";
import { Button } from "../../../common/components/ui/Button";
import { Input } from "../../../common/components/ui/Input";

export const AdminPropertyFormPage = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const { data: property } = useProperty(id);
    const createProperty = useCreateProperty();
    const updateProperty = useUpdateProperty();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        price_per_night: "",
        amenities: "",
        images: "",
    });

    useEffect(() => {
        if (property && isEdit) {
            setForm({
                title: property.title || "",
                description: property.description || "",
                location: property.location || "",
                price_per_night: property.price_per_night || "",
                amenities: (property.amenities || []).join(", "),
                images: (property.images || []).join(", "),
            });
        }
    }, [property, isEdit]);

    const onChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: form.title,
            description: form.description,
            location: form.location,
            price_per_night: Number(form.price_per_night),
            amenities: form.amenities
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            images: form.images
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
        };

        if (isEdit) {
            await updateProperty.mutateAsync({ id, payload });
        } else {
            await createProperty.mutateAsync(payload);
        }
        navigate("/admin/properties");
    };

    return (
        <PageContainer className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">
                {isEdit ? "Edit property" : "New property"}
            </h1>

            <form
                onSubmit={onSubmit}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm space-y-4 max-w-2xl"
            >
                <Input
                    label="Title"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    required
                />
                <Input
                    label="Location"
                    name="location"
                    value={form.location}
                    onChange={onChange}
                    required
                />
                <Input
                    label="Price per night"
                    name="price_per_night"
                    type="number"
                    min="0"
                    value={form.price_per_night}
                    onChange={onChange}
                    required
                />
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        rows={4}
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <Input
                    label="Amenities (comma separated)"
                    name="amenities"
                    value={form.amenities}
                    onChange={onChange}
                />
                <Input
                    label="Image URLs (comma separated)"
                    name="images"
                    value={form.images}
                    onChange={onChange}
                />

                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate("/admin/properties")}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">
                        {isEdit ? "Save changes" : "Create property"}
                    </Button>
                </div>
            </form>
        </PageContainer>
    );
};
