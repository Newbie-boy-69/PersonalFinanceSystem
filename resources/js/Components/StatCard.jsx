import { formatCurrency } from '../Utils/formatCurrency';

export default function StatCard({
    title,
    amount,
    type = 'neutral',
    icon,
    subtitle,
    badge,
    className = '',
}) {
    const isNegativeBalance = type === 'balance' && Number(amount) < 0;

    // Semantic color mappings aligned with approved Premium Fintech Palette
    // When balance is negative, strictly uses consistent negative/expense styling with zero teal supporting accents
    const typeStyles = {
        income: {
            text: 'text-emerald-accent',
            iconBg: 'bg-emerald-accent/10 text-emerald-accent',
            badgeBg: 'bg-emerald-accent/15 text-emerald-accent',
        },
        expense: {
            text: 'text-expense-accent',
            iconBg: 'bg-expense-accent/10 text-expense-accent',
            badgeBg: 'bg-expense-accent/15 text-expense-accent',
        },
        balance: isNegativeBalance
            ? {
                  text: 'text-expense-accent',
                  iconBg: 'bg-expense-accent/10 text-expense-accent',
                  badgeBg: 'bg-expense-accent/15 text-expense-accent',
              }
            : {
                  text: 'text-teal-primary',
                  iconBg: 'bg-teal-primary/10 text-teal-primary',
                  badgeBg: 'bg-teal-primary/15 text-teal-primary',
              },
        savings: {
            text: 'text-gold-accent',
            iconBg: 'bg-gold-accent/10 text-gold-accent',
            badgeBg: 'bg-gold-accent/15 text-gold-accent',
        },
        neutral: {
            text: 'text-text-main',
            iconBg: 'bg-surface-bg text-text-muted',
            badgeBg: 'bg-surface-bg text-text-muted',
        },
    };

    const style = typeStyles[type] || typeStyles.neutral;

    return (
        <div className={`bg-card-white rounded-2xl border border-border-subtle shadow-xs p-5 sm:p-6 transition-all duration-200 hover:shadow-md hover:border-slate-300 relative overflow-hidden ${className}`}>
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-text-muted truncate">
                        {title}
                    </p>
                    <h3 className={`text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight mt-2 tabular-nums ${style.text}`}>
                        {formatCurrency(amount)}
                    </h3>
                </div>

                {icon && (
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg}`} aria-hidden="true">
                        {icon}
                    </div>
                )}
            </div>

            {(subtitle || badge) && (
                <div className="mt-4 pt-3 border-t border-border-subtle/80 flex items-center justify-between text-xs text-text-muted">
                    {subtitle && <span className="truncate">{subtitle}</span>}
                    {badge && (
                        <span className={`px-2 py-0.5 rounded-full font-medium ml-auto ${style.badgeBg}`}>
                            {badge}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
