import { useId } from 'react';

export default function Input({
    label,
    id,
    type = 'text',
    value,
    onChange,
    error,
    hint,
    required = false,
    placeholder,
    icon,
    className = '',
    disabled = false,
    ...props
}) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint && !error ? `${inputId}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
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

            <div className="relative rounded-xl">
                {icon && (
                    <div
                        className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"
                        aria-hidden="true"
                    >
                        {icon}
                    </div>
                )}

                <input
                    id={inputId}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={describedBy}
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed ${
                        icon ? 'pl-10' : ''
                    } ${
                        error
                            ? 'border-rose-300 focus:border-rose-600 focus:ring-rose-100'
                            : 'border-slate-300 focus:border-teal-700 focus:ring-teal-100'
                    }`}
                    {...props}
                />
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
