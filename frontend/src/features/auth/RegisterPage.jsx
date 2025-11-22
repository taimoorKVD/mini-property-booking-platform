import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { PageContainer } from "../../common/components/layout/PageContainer";
import { Button } from "../../common/components/ui/Button";
import { Input } from "../../common/components/ui/Input";

export const RegisterPage = () => {
    const { user, register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    if (user) return <Navigate to="/" replace />;

    const onChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            setError(null);
            await register(form);
            navigate("/");
        } catch (err) {
            const apiError =
                err?.response?.data?.errors ||
                err?.response?.data?.message ||
                "Registration failed.";
            setError(
                typeof apiError === "string"
                    ? apiError
                    : "Registration failed. Please check your inputs."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PageContainer className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold mb-1">Create an account</h1>
                <p className="text-sm text-slate-600 mb-4">
                    Sign up to start booking properties.
                </p>

                {error && (
                    <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                        {String(error)}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-3">
                    <Input
                        label="Full name"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        required
                    />
                    <Input
                        label="Email address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        required
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChange}
                        required
                        helperText="Minimum 6 characters."
                    />
                    <Button type="submit" className="w-full" disabled={submitting}>
                        {submitting ? "Creating account…" : "Create account"}
                    </Button>
                </form>

                <p className="mt-4 text-xs text-slate-600 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-blue-700">
                        Sign in
                    </Link>
                </p>
            </div>
        </PageContainer>
    );
};
