export const Input = ({
                          label,
                          name,
                          type = "text",
                          helperText,
                          className = "",
                          ...props
                      }) => {
    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-xs font-medium text-slate-700 mb-1"
                >
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...props}
            />
            {helperText && (
                <p className="mt-1 text-[11px] text-slate-500">{helperText}</p>
            )}
        </div>
    );
};
