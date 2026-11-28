export default function Card({
    children,
    className = '',
    hover = false,
    padding = 'md',
    as: Component = 'div',
    ...props
}) {
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const hoverClass = hover
        ? 'transition-all duration-200 hover:shadow-md hover:border-slate-300'
        : '';

    return (
        <Component
            className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs ${paddingClasses[padding] || paddingClasses.md} ${hoverClass} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
}

Card.Header = function CardHeader({
    title,
    subtitle,
    action,
    className = '',
    children,
}) {
    return (
        <div className={`flex items-start justify-between gap-4 mb-5 ${className}`}>
            <div>
                {title && (
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                        {title}
                    </h3>
                )}
                {subtitle && (
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        {subtitle}
                    </p>
                )}
                {children}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
};
