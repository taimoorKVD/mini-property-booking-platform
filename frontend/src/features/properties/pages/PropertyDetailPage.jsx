import { useParams } from "react-router-dom";
import { useProperty } from "../hooks";
import { PageContainer } from "../../../common/components/layout/PageContainer";
import { BookingForm } from "../../bookings/components/BookingForm";

export const PropertyDetailPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useProperty(id);

    const property = data?.data; // 👈 unwrap here

    if (isLoading) {
        return (
            <PageContainer className="flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            </PageContainer>
        );
    }

    if (!property) {
        return (
            <PageContainer>
                <p className="text-sm text-slate-600">Property not found.</p>
            </PageContainer>
        );
    }

    const mainImage =
        property.images && property.images.length
            ? property.images[0]
            : "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800";

    return (
        <PageContainer className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {property.title}
                </h1>
                <p className="text-sm text-slate-600">{property.location}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
                        <img
                            src={mainImage}
                            alt={property.title}
                            className="h-64 w-full object-cover"
                        />
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-3">
                        <h2 className="text-lg font-semibold">Description</h2>
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                            {property.description || "No description provided."}
                        </p>

                        {property.amenities && property.amenities.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold mb-1">Amenities</h3>
                                <div className="flex flex-wrap gap-1">
                                    {property.amenities.map((a) => (
                                        <span
                                            key={a}
                                            className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
                                        >
                                            {a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-2">
                        <h2 className="text-lg font-semibold">Availability ranges</h2>
                        {property.availabilities && property.availabilities.length > 0 ? (
                            <ul className="text-sm text-slate-700 space-y-1">
                                {property.availabilities.map((a) => (
                                    <li key={a.id}>
                                        {a.start_date} → {a.end_date}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-500">
                                No availability ranges configured yet.
                            </p>
                        )}
                    </div>
                </div>

                <aside className="lg:col-span-1">
                    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-4 sticky top-20">
                        <div className="text-2xl font-bold text-blue-700">
                            ${property.price_per_night}
                            <span className="ml-1 text-sm font-normal text-slate-500">
                                / night
                            </span>
                        </div>
                        <BookingForm propertyId={property.id} />
                    </div>
                </aside>
            </div>
        </PageContainer>
    );
};
