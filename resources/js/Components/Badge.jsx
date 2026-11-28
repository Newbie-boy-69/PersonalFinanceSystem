export default function Badge({
    children,
    variant = 'neutral',
    size = 'md',
    dot = false,
    className = '',
}) {
    // Premium Fintech semantic palette variants using custom theme tokens
    const variants = {
        income: 'bg-emerald-accent/10 text-emerald-accent border-emerald-accent/30',
        expense: 'bg-expense-accent/10 text-expense-accent border-expense-accent/30',
        success: 'bg-emerald-accent/10 text-emerald-accent border-emerald-accent/30',
        danger: 'bg-expense-accent/10 text-expense-accent border-expense-accent/30',
        primary: 'bg-teal-primary/10 text-teal-primary border-teal-primary/30',
        gold: 'bg-gold-accent/10 text-gold-accent border-gold-accent/30',
        warning: 'bg-gold-accent/10 text-gold-accent border-gold-accent/30',
        navy: 'bg-navy-surface text-card-white border-navy-deep',
        neutral: 'bg-surface-bg text-text-muted border-border-subtle',
    };

    const dotColors = {
        income: 'bg-emerald-accent',
        expense: 'bg-expense-accent',
        success: 'bg-emerald-accent',
        danger: 'bg-expense-accent',
        primary: 'bg-teal-primary',
        gold: 'bg-gold-accent',
        warning: 'bg-gold-accent',
        navy: 'bg-border-subtle',
        neutral: 'bg-text-muted',
    };

    const sizes = {
        sm: 'text-[11px] px-2 py-0.5',
        md: 'text-xs px-2.5 py-1',
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variants[variant] || variants.neutral} ${sizes[size] || sizes.md} ${className}`}
        >
            {dot && (
                <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant] || dotColors.neutral}`}
                    aria-hidden="true"
                />
            )}
            {children}
        </span>
    );
}
