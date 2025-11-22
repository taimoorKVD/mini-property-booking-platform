import { useState } from "react";
import { PageContainer } from "../../../common/components/layout/PageContainer";
import { useBookings, useUpdateBookingStatus } from "../../bookings/hooks";
import { Badge } from "../../../common/components/ui/Badge";
import { Button } from "../../../common/components/ui/Button";

export const AdminBookingsPage = () => {
    const [page, setPage] = useState(1);

    // pass page to hook so it calls /bookings?page=...
    const { data, isLoading } = useBookings({ page });
    const updateStatus = useUpdateBookingStatus();

    // Treat data as Laravel paginator
    const paginator = data || {};
    const bookings = paginator.data || [];
    const currentPage = paginator.current_page || 1;
    const lastPage = paginator.last_page || 1;
    const total = paginator.total || 0;
    const from = paginator.from || 0;
    const to = paginator.to || bookings.length;
    const links = paginator.links || [];

    const canPrev = currentPage > 1;
    const canNext = currentPage < lastPage;

    const goPrev = () => {
        if (canPrev) setPage((p) => p - 1);
    };

    const goNext = () => {
        if (canNext) setPage((p) => p + 1);
    };

    // Numeric page links from Laravel "links" array (no prev/next)
    const numericLinks = links.filter(
        (link) =>
            link.url !== null &&
            link.label !== "&laquo; Previous" &&
            link.label !== "Next &raquo;"
    );

    const handleChangeStatus = (bookingId, status) => {
        updateStatus.mutate({ id: bookingId, status });
    };

    return (
        <PageContainer className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>

            {isLoading ? (
                <div className="flex items-center justify-center py-16">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                </div>
            ) : bookings.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                    No bookings yet.
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white shadow-sm">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="px-4 py-2 text-left">Guest</th>
                                <th className="px-4 py-2 text-left">Property</th>
                                <th className="px-4 py-2 text-left">Dates</th>
                                <th className="px-4 py-2 text-left">Total</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookings.map((b) => (
                                <tr key={b.id} className="border-t border-slate-100">
                                    <td className="px-4 py-2">{b.user?.name}</td>
                                    <td className="px-4 py-2">{b.property?.title}</td>
                                    <td className="px-4 py-2">
                                        {b.start_date} → {b.end_date}
                                    </td>
                                    <td className="px-4 py-2">
                                        ${b.property?.price_per_night}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Badge
                                            variant={
                                                b.status === "confirmed"
                                                    ? "success"
                                                    : b.status === "rejected"
                                                        ? "danger"
                                                        : "warning"
                                            }
                                        >
                                            {b.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        {b.status !== "confirmed" && (
                                            <button
                                                onClick={() =>
                                                    handleChangeStatus(b.id, "confirmed")
                                                }
                                                className="text-xs text-emerald-700 hover:underline"
                                            >
                                                Confirm
                                            </button>
                                        )}

                                        {b.status !== "rejected" && (
                                            <button
                                                onClick={() =>
                                                    handleChangeStatus(b.id, "rejected")
                                                }
                                                className="text-xs text-red-600 hover:underline"
                                            >
                                                Reject
                                            </button>
                                        )}

                                        {b.status !== "pending" && (
                                            <button
                                                onClick={() =>
                                                    handleChangeStatus(b.id, "pending")
                                                }
                                                className="text-xs text-slate-600 hover:underline"
                                            >
                                                Pending
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination bar */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-4 text-sm">
                        <div className="text-slate-600">
                            Showing{" "}
                            <span className="font-semibold">
                                {from}–{to}
                            </span>{" "}
                            of <span className="font-semibold">{total}</span> bookings
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                disabled={!canPrev}
                                onClick={goPrev}
                            >
                                Previous
                            </Button>

                            <div className="flex items-center gap-1">
                                {numericLinks.map((link) => (
                                    <button
                                        key={link.label}
                                        onClick={() => {
                                            try {
                                                const url = new URL(link.url);
                                                const pageParam =
                                                    url.searchParams.get("page");
                                                const pageNumber =
                                                    Number(pageParam || 1);
                                                setPage(pageNumber);
                                            } catch {
                                                // fallback: try label
                                                setPage(Number(link.label));
                                            }
                                        }}
                                        className={[
                                            "px-2.5 py-1 rounded-md text-xs font-medium border",
                                            link.active
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100",
                                        ].join(" ")}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            <Button
                                variant="secondary"
                                disabled={!canNext}
                                onClick={goNext}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </PageContainer>
    );
};
