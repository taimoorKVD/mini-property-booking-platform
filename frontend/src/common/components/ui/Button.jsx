export const Button = ({
                           children,
                           variant = "primary",
                           className = "",
                           ...props
                       }) => {
    const base =
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
        secondary:
            "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400",
        ghost:
            "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-300",
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
