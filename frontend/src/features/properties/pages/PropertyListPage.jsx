import { useState } from "react";
import { useProperties } from "../hooks";
import { PropertyCard } from "../components/PropertyCard";
import { PageContainer } from "../../../common/components/layout/PageContainer";
import { Button } from "../../../common/components/ui/Button";

export const PropertyListPage = () => {
    const [filters, setFilters] = useState({
        location: "",
        min: "",
        max: "",
        start_date: "",
        end_date: "",
    });

    const [page, setPage] = useState(1);

    const { data, isLoading } = useProperties({ ...filters, page });

    // Paginator fields (exactly matching your JSON)
    const paginator = data || {};
    const properties = paginator.data || [];
    const currentPage = paginator.current_page || 1;
    const lastPage = paginator.last_page || 1;
    const total = paginator.total || 0;
    const from = paginator.from || 0;
    const to = paginator.to || properties.length;
    const links = paginator.links || [];

    const onFilterChange = (e) =>
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1); // reset to first page on filter change
    };

    const canPrev = currentPage > 1;
    const canNext = currentPage < lastPage;

    const goPrev = () => {
        if (canPrev) setPage((p) => p - 1);
    };

    const goNext = () => {
        if (canNext) setPage((p) => p + 1);
    };

    // Numeric page links from Laravel's "links" array
    const numericLinks = links.filter(
        (link) =>
            link.page !== null && // skip prev/next
            link.label !== "&laquo; Previous" &&
            link.label !== "Next &raquo;"
    );

    return (
        <PageContainer className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Find your next stay
                    </h1>
                    <p className="text-sm text-slate-600">
                        Search and book properties by location, price, and availability.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 md:grid-cols-6 gap-3 rounded-xl bg-white p-4 shadow-sm border border-slate-100"
            >
                <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                        Location
                    </label>
                    <input
                        name="location"
                        value={filters.location}
                        onChange={onFilterChange}
                        placeholder="City, area…"
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                        Min price
                    </label>
                    <input
                        name="min"
                        value={filters.min}
                        onChange={onFilterChange}
                        type="number"
                        min="0"
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                        Max price
                    </label>
                    <input
                        name="max"
                        value={filters.max}
                        onChange={onFilterChange}
                        type="number"
                        min="0"
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                        Check-in
                    </label>
                    <input
                        name="start_date"
                        value={filters.start_date}
                        onChange={onFilterChange}
                        type="date"
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                        Check-out
                    </label>
                    <input
                        name="end_date"
                        value={filters.end_date}
                        onChange={onFilterChange}
                        type="date"
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div className="md:col-span-6 flex justify-end">
                    <Button type="submit">Apply filters</Button>
                </div>
            </form>

            {/* List + pagination */}
            {isLoading ? (
                <div className="flex items-center justify-center py-16">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                </div>
            ) : properties.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                    No properties match your criteria yet.
                </div>
            ) : (
                <>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {properties.map((p) => (
                            <PropertyCard key={p.id} property={p} />
                        ))}
                    </div>

                    {/* Pagination bar */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-4 text-sm">
                        <div className="text-slate-600">
                            Showing{" "}
                            <span className="font-semibold">
                {from}–{to}
              </span>{" "}
                            of <span className="font-semibold">{total}</span> properties
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                disabled={!canPrev}
                                onClick={goPrev}
                            >
                                Previous
                            </Button>

                            {/* Numbered pages */}
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
