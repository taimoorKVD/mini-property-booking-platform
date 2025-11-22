export const PageContainer = ({ children, className = "" }) => (
    <div className={`max-w-6xl mx-auto px-4 py-6 ${className}`}>{children}</div>
);
