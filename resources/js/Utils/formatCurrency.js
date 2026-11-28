/**
 * Format numeric value to Philippine Peso (PHP) currency string.
 * Explicitly handles missing, invalid, and non-finite numbers with a fallback string.
 *
 * @param {number|string|null|undefined} amount - The amount to format
 * @param {object} [options={}] - Formatting options
 * @param {boolean} [options.showSign=false] - Prepend + for positive, - for negative
 * @param {number} [options.minimumFractionDigits=2] - Minimum fraction digits
 * @param {number} [options.maximumFractionDigits=2] - Maximum fraction digits
 * @param {string} [options.fallback='—'] - Fallback for missing/invalid/non-finite values
 * @returns {string} Formatted currency string or fallback
 */
export function formatCurrency(amount, options = {}) {
    const {
        showSign = false,
        minimumFractionDigits = 2,
        maximumFractionDigits = 2,
        fallback = '—',
    } = options;

    if (amount === null || amount === undefined || amount === '' || typeof amount === 'boolean') {
        return fallback;
    }

    const num = Number(amount);
    if (!Number.isFinite(num)) {
        return fallback;
    }

    const formatted = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(Math.abs(num));

    if (showSign) {
        if (num > 0) return `+${formatted}`;
        if (num < 0) return `-${formatted}`;
    } else if (num < 0) {
        return `-${formatted}`;
    }

    return formatted;
}

/**
 * Format number in compact notation (e.g. ₱1.2K, ₱3.5M).
 * Explicitly handles missing, invalid, and non-finite numbers with a fallback string.
 *
 * @param {number|string|null|undefined} amount
 * @param {object} [options={}]
 * @param {string} [options.fallback='—']
 * @returns {string} Compact formatted currency string or fallback
 */
export function formatCompactCurrency(amount, options = {}) {
    const { fallback = '—' } = options;

    if (amount === null || amount === undefined || amount === '' || typeof amount === 'boolean') {
        return fallback;
    }

    const num = Number(amount);
    if (!Number.isFinite(num)) {
        return fallback;
    }

    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(num);
}

export default formatCurrency;
