import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useCreateBooking } from "../hooks";
import { Button } from "../../../common/components/ui/Button";
import { Input } from "../../../common/components/ui/Input";

export const BookingForm = ({ propertyId }) => {
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const createBooking = useCreateBooking();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate("/login");
            return;
        }

        try {
            setError(null);
            setMessage(null);
            await createBooking.mutateAsync({ property_id: propertyId, start_date, end_date });
            setMessage("Booking request sent. You will be notified once it’s processed.");
            setStartDate("");
            setEndDate("");
        } catch (err) {
            const apiMessage =
                err?.response?.data?.message ||
                "Booking failed. Please check your dates and try again.";
            setError(apiMessage);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-3">
            <h2 className="text-sm font-semibold">Request a booking</h2>

            <Input
                label="Check-in date"
                type="date"
                name="start_date"
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
                required
            />
            <Input
                label="Check-out date"
                type="date"
                name="end_date"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
                required
            />

            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                    {error}
                </div>
            )}
            {message && (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                    {message}
                </div>
            )}

            <Button
                type="submit"
                className="w-full"
                disabled={createBooking.isLoading}
            >
                {createBooking.isLoading ? "Submitting…" : "Request booking"}
            </Button>

            {!user && (
                <p className="text-[11px] text-slate-500 text-center">
                    You’ll be asked to log in before your booking is submitted.
                </p>
            )}
        </form>
    );
};
