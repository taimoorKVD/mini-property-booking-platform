import { PageContainer } from "../../../common/components/layout/PageContainer";
import { useProperties } from "../../properties/hooks";
import { useBookings } from "../../bookings/hooks";

export const AdminDashboardPage = () => {
    const { data: propertiesData } = useProperties({});
    const { data: bookingsData } = useBookings();

    const properties = propertiesData?.data || propertiesData || [];
    const bookings = bookingsData?.data || bookingsData || [];

    return (
        <PageContainer className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight">
                Admin dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="text-xs text-slate-500 uppercase mb-1">
                        Total properties
                    </div>
                    <div className="text-2xl font-bold">{properties.length}</div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="text-xs text-slate-500 uppercase mb-1">
                        Total bookings
                    </div>
                    <div className="text-2xl font-bold">{bookings.length}</div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="text-xs text-slate-500 uppercase mb-1">
                        Pending bookings
                    </div>
                    <div className="text-2xl font-bold">
                        {bookings.filter((b) => b.status === "pending").length}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
