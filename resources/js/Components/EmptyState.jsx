export default function EmptyState({
    title = 'No records found',
    description = 'There are no items to display right now.',
    icon,
    action,
    className = '',
}) {
    return (
        <div className={`text-center py-12 px-4 rounded-2xl border-2 border-dashed border-slate-200/90 bg-slate-50/50 ${className}`}>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 text-slate-400 mx-auto flex items-center justify-center mb-4">
                {icon || (
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                    </svg>
                )}
            </div>

            <h3 className="text-base font-semibold text-slate-800">
                {title}
            </h3>

            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                {description}
            </p>

            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}
