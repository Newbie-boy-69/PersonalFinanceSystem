import { useEffect, useRef, useId } from 'react';
import Button from './Button';

/**
 * Checks whether an element is visible and capable of receiving layout focus.
 */
function isElementVisible(el) {
    if (!el) return false;
    if (el.getClientRects().length === 0 && el.offsetParent === null) {
        return false;
    }
    const style = window.getComputedStyle(el);
    return style.visibility !== 'hidden' && style.display !== 'none';
}

/**
 * Checks whether an element or any of its ancestors up to the container is inaccessible:
 * - Has aria-hidden="true"
 * - Has the inert attribute or inert property
 */
function isElementInaccessible(el, container) {
    let current = el;
    while (current && current !== container.parentElement) {
        if (current.getAttribute('aria-hidden') === 'true') {
            return true;
        }
        if (current.hasAttribute('inert') || current.inert) {
            return true;
        }
        current = current.parentElement;
    }
    return false;
}

/**
 * Queries all valid focusable elements inside a container, explicitly excluding:
 * - Links with aria-disabled="true"
 * - Elements with tabindex="-1"
 * - Disabled native controls (including controls disabled via ancestor <fieldset disabled>)
 * - Elements that are hidden or not visible
 * - Elements inside an ancestor with aria-hidden="true" or the inert attribute
 */
function getFocusableElements(container) {
    if (!container) return [];

    const candidates = container.querySelectorAll(
        'button, ' +
        'a[href], ' +
        'input:not([type="hidden"]), ' +
        'select, ' +
        'textarea, ' +
        '[tabindex]'
    );

    return Array.from(candidates).filter((el) => {
        if (el.getAttribute('tabindex') === '-1') return false;
        if (el.getAttribute('aria-disabled') === 'true') return false;
        if (el.matches(':disabled')) return false;
        if (!isElementVisible(el)) return false;
        if (isElementInaccessible(el, container)) return false;
        return true;
    });
}

export default function Modal({
    isOpen = false,
    onClose,
    title,
    description,
    children,
    confirmText = 'Confirm',
    confirmVariant = 'danger',
    onConfirm,
    loading = false,
    showConfirm = true,
    showCancel = true,
    ariaLabel,
}) {
    const dialogRef = useRef(null);
    const triggerRef = useRef(null);
    const hasOpenedRef = useRef(false);
    const focusRestoredRef = useRef(false);
    const unmountRestoreToken = useRef(0);
    const titleId = useId();
    const descriptionId = useId();

    // Safe focus restoration helper that checks isConnected and provides a stable fallback
    const restoreFocus = () => {
        if (focusRestoredRef.current) return;
        focusRestoredRef.current = true;

        const el = triggerRef.current;
        triggerRef.current = null;

        if (el && typeof el.focus === 'function' && el.isConnected) {
            el.focus();
        } else {
            // Stable fallback focus target if original element was detached or removed
            const fallback = document.querySelector('main') || document.body;
            if (fallback) {
                if (fallback !== document.body && !fallback.hasAttribute('tabindex')) {
                    fallback.setAttribute('tabindex', '-1');
                }
                fallback.focus?.();
            }
        }
    };

    // Focus entry on open, immediate restoration on genuine close
    useEffect(() => {
        if (isOpen) {
            // Invalidate any pending unmount restoration token from Strict Mode simulated cleanup
            unmountRestoreToken.current++;
            focusRestoredRef.current = false;
            hasOpenedRef.current = true;
            triggerRef.current = document.activeElement;

            const frameId = requestAnimationFrame(() => {
                if (dialogRef.current) {
                    const focusable = getFocusableElements(dialogRef.current);
                    if (focusable.length > 0) {
                        focusable[0].focus();
                    } else {
                        dialogRef.current.focus();
                    }
                }
            });

            return () => {
                cancelAnimationFrame(frameId);
            };
        } else if (hasOpenedRef.current && !focusRestoredRef.current) {
            // Ordinary close: restore focus immediately and synchronously
            restoreFocus();
        }
    }, [isOpen]);

    // Unmount restoration: handles cases where parent conditionally unmounts Modal while open
    // Uses cancellable microtask token so React Strict Mode's simulated unmount/remount does not restore focus prematurely
    useEffect(() => {
        return () => {
            if (hasOpenedRef.current && !focusRestoredRef.current) {
                const token = ++unmountRestoreToken.current;
                queueMicrotask(() => {
                    if (unmountRestoreToken.current === token) {
                        restoreFocus();
                    }
                });
            }
        };
    }, []);

    // Handle Tab trapping, Escape dismissal (guarded against loading state), and scroll lock
    useEffect(() => {
        if (!isOpen) return;

        if (loading && dialogRef.current && getFocusableElements(dialogRef.current).length === 0) {
            dialogRef.current.focus();
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                // Prevent escape dismissal while confirmation is loading
                if (!loading) {
                    onClose?.();
                }
                return;
            }

            if (e.key === 'Tab' && dialogRef.current) {
                const focusable = getFocusableElements(dialogRef.current);
                if (focusable.length === 0) {
                    e.preventDefault();
                    dialogRef.current.focus();
                    return;
                }

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first || !dialogRef.current.contains(document.activeElement)) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last || !dialogRef.current.contains(document.activeElement)) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose, loading]);

    if (!isOpen) return null;

    const handleBackdropClick = () => {
        // Prevent backdrop dismissal while confirmation is loading
        if (!loading) {
            onClose?.();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-navy-deep/60 backdrop-blur-xs transition-opacity"
                onClick={handleBackdropClick}
                aria-hidden="true"
            />

            {/* Modal Dialog Box */}
            <div
                ref={dialogRef}
                tabIndex={-1}
                className="relative bg-card-white rounded-2xl border border-border-subtle shadow-2xl max-w-md w-full p-6 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 focus:outline-none"
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-label={!title ? (ariaLabel || 'Dialog') : undefined}
                aria-describedby={description ? descriptionId : undefined}
            >
                {title && (
                    <h3
                        id={titleId}
                        className="text-lg font-bold text-text-main tracking-tight"
                    >
                        {title}
                    </h3>
                )}

                {description && (
                    <p
                        id={descriptionId}
                        className="text-sm text-text-muted mt-1.5 leading-normal"
                    >
                        {description}
                    </p>
                )}

                {children && <div className="mt-4">{children}</div>}

                {(showConfirm || showCancel) && (
                    <div className="mt-6 flex items-center justify-end gap-3">
                        {showCancel && (
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        )}

                        {showConfirm && onConfirm && (
                            <Button
                                variant={confirmVariant}
                                size="sm"
                                onClick={onConfirm}
                                loading={loading}
                            >
                                {confirmText}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
