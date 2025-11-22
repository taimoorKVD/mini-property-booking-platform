import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { Button } from "../../../common/components/ui/Button";

export const PropertyCard = ({ property }) => {
    const { isAdmin } = useAuth();

    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {property.images?.[0] && (
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="h-40 w-full object-cover"
                />
            )}

            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-semibold text-slate-900">
                    {property.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                    {property.description}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                    ${property.price_per_night}{" "}
                    <span className="text-xs font-normal text-slate-500">
            / night · {property.location}
          </span>
                </p>

                <div className="mt-3 flex gap-2">
                    <Link to={`/properties/${property.id}`} className="flex-1">
                        <Button className="w-full" size="sm">
                            View details
                        </Button>
                    </Link>

                    {/* Admin-only shortcut */}
                    {isAdmin && (
                        <Link to={`/admin/properties?edit=${property.id}`}>
                            <Button variant="secondary" size="sm">
                                Edit
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};