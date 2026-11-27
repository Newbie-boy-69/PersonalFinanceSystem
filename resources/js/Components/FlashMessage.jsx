import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    if (!visible || !flash?.success) {
        return null;
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto px-6 mt-4">
            <div className="flex items-center justify-between gap-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-sm">
                <p className="text-sm font-medium">{flash.success}</p>

                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    className="text-green-600 hover:text-green-800 text-lg leading-none shrink-0"
                    aria-label="Dismiss notification"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
