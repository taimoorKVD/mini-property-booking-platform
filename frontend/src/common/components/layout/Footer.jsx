export const Footer = () => (
    <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Mini Property Booking Platform</span>
            <span>Built with Laravel API & React</span>
        </div>
    </footer>
);
