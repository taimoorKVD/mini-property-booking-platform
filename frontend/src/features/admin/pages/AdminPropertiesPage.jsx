import { Link, useNavigate } from "react-router-dom";
import { useProperties, useDeleteProperty } from "../../properties/hooks";
import { PageContainer } from "../../../common/components/layout/PageContainer";
import { Button } from "../../../common/components/ui/Button";

export const AdminPropertiesPage = () => {
    const { data, isLoading } = useProperties({});
    const properties = data?.data || data || [];
    const deleteProperty = useDeleteProperty();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if (!window.confirm("Delete this property?")) return;
        deleteProperty.mutate(id);
    };

    return (
        <PageContainer className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Properties</h1>
                <Button onClick={() => navigate("/admin/properties/new")}>
                    New property
                </Button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-16">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                </div>
            ) : properties.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                    No properties yet. Start by creating one.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white shadow-sm">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Price/night</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {properties.map((p) => (
                            <tr key={p.id} className="border-t border-slate-100">
                                <td className="px-4 py-2">{p.title}</td>
                                <td className="px-4 py-2">{p.location}</td>
                                <td className="px-4 py-2">${p.price_per_night}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <Link
                                        to={`/admin/properties/${p.id}/edit`}
                                        className="text-blue-700 text-xs hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to={`/admin/properties/${p.id}/availability`}
                                        className="text-xs text-emerald-700 hover:underline"
                                    >
                                        Availability
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="text-xs text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </PageContainer>
    );
};
