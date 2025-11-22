import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { PageContainer } from "../../common/components/layout/PageContainer.jsx";
import { Button } from "../../common/components/ui/Button.jsx";

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const onChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            await login(form);
            navigate(from, { replace: true });
        } catch (err) {
            setError(
                err?.response?.data?.message || "Failed to login. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageContainer className="flex items-center justify-center py-16">
            <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold">Sign in</h1>
                <p className="mt-1 text-xs text-slate-600">
                    Sign in to book properties and manage your stays.
                </p>

                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                    {error && (
                        <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={onChange}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={onChange}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                <p className="mt-3 text-xs text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </PageContainer>
    );
};