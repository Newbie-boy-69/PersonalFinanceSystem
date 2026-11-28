import { Link } from '@inertiajs/react';

export default function Button({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    href,
    disabled = false,
    loading = false,
    icon,
    className = '',
    onClick,
    ...props
}) {
    const isDisabled = disabled || loading;

    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none';

    // Premium Fintech semantic palette variants using custom theme tokens
    const variants = {
        primary: 'bg-teal-primary hover:bg-teal-primary/90 text-white shadow-xs focus:ring-teal-primary',
        secondary: 'bg-card-white hover:bg-surface-bg text-text-main border border-border-subtle shadow-xs focus:ring-slate-400',
        danger: 'bg-expense-accent hover:bg-expense-accent/90 text-white shadow-xs focus:ring-expense-accent',
        success: 'bg-emerald-accent hover:bg-emerald-accent/90 text-white shadow-xs focus:ring-emerald-accent',
        gold: 'bg-gold-accent hover:bg-gold-accent/90 text-white shadow-xs focus:ring-gold-accent',
        ghost: 'bg-transparent hover:bg-surface-bg text-text-muted hover:text-text-main focus:ring-slate-400',
    };

    const sizes = {
        xs: 'text-xs px-2.5 py-1.5 gap-1.5',
        sm: 'text-xs px-3 py-2 gap-1.5',
        md: 'text-sm px-4 py-2.5 gap-2',
        lg: 'text-base px-5 py-3 gap-2.5',
    };

    const disabledClasses = isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
    const combinedClassName = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${disabledClasses} ${className}`;

    const content = (
        <>
            {loading && (
                <>
                    <svg
                        className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </>
            )}
            {!loading && icon && (
                <span className="shrink-0" aria-hidden="true">
                    {icon}
                </span>
            )}
            <span>{children}</span>
        </>
    );

    // If href is provided, render Inertia Link with guarded click and accessibility attributes
    if (href) {
        const handleLinkClick = (e) => {
            if (isDisabled) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            onClick?.(e);
        };

        return (
            <Link
                href={href}
                className={combinedClassName}
                onClick={handleLinkClick}
                aria-disabled={isDisabled ? 'true' : undefined}
                tabIndex={isDisabled ? -1 : undefined}
                {...props}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            disabled={isDisabled}
            className={combinedClassName}
            onClick={onClick}
            aria-busy={loading ? 'true' : undefined}
            {...props}
        >
            {content}
        </button>
    );
}
