export default function PageHeader({
    title,
    description,
    action,
    badge,
    children,
    className = '',
}) {
    return (
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 ${className}`}>
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {title}
                    </h1>
                    {badge && <div>{badge}</div>}
                </div>
                {description && (
                    <p className="text-sm text-slate-500 mt-1.5 leading-normal">
                        {description}
                    </p>
                )}
            </div>

            {(action || children) && (
                <div className="flex items-center gap-3 shrink-0">
                    {action}
                    {children}
                </div>
            )}
        </div>
    );
}
