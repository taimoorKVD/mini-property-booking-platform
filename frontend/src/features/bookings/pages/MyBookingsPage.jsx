import { useState } from "react";
import { useBookings } from "../hooks";
import { PageContainer } from "../../../common/components/layout/PageContainer";
import { Badge } from "../../../common/components/ui/Badge";
import { Button } from "../../../common/components/ui/Button";

export const MyBookingsPage = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useBookings({ page });

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

    const numericLinks = links.filter(
        (link) =>
            link.page !== null &&
            link.label !== "&laquo; Previous" &&
            link.label !== "Next &raquo;"
    );

    return (
        <PageContainer className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">My bookings</h1>

            {isLoading ? (
                <div className="flex items-center justify-center py-16">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                </div>
            ) : bookings.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                    You don’t have any bookings yet.
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {bookings.map((b) => (
                            <div
                                key={b.id}
                                className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                            >
                                <div>
                                    <div className="text-sm font-semibold">
                                        {b.property?.title || "Property"}
                                    </div>
                                    <div className="text-xs text-slate-600">
                                        {b.start_date} → {b.end_date}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500">
                                        Location: {b.property?.location}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-sm font-semibold text-blue-700">
                                        ${b.property?.price_per_night}
                                    </span>
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
                                </div>
                            </div>
                        ))}
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
                                        onClick={() => setPage(link.page)}
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
