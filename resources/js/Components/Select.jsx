import { useId } from 'react';

export default function Select({
    label,
    id,
    value,
    onChange,
    error,
    hint,
    required = false,
    options = [],
    placeholder = 'Select an option',
    children,
    className = '',
    disabled = false,
    ...props
}) {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = error ? `${selectId}-error` : undefined;
    const hintId = hint && !error ? `${selectId}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-semibold text-slate-700"
                >
                    {label}
                    {required && (
                        <span className="text-rose-600 ml-1" aria-hidden="true">
                            *
                        </span>
                    )}
                </label>
            )}

            <div className="relative">
                <select
                    id={selectId}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={describedBy}
                    className={`w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed ${
                        error
                            ? 'border-rose-300 focus:border-rose-600 focus:ring-rose-100'
                            : 'border-slate-300 focus:border-teal-700 focus:ring-teal-100'
                    }`}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled={required}>
                            {placeholder}
                        </option>
                    )}

                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}

                    {children}
                </select>

                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400" aria-hidden="true">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {error && (
                <p id={errorId} className="text-xs text-rose-600 font-medium mt-1" role="alert">
                    {error}
                </p>
            )}

            {hint && !error && (
                <p id={hintId} className="text-xs text-slate-500 mt-1">
                    {hint}
                </p>
            )}
        </div>
    );
}
