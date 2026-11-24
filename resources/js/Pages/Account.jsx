
import { usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Account() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content');

    return (
        <AppLayout>
            <div>
                <h1 className="text-3xl font-bold mb-2">My Account</h1>

                <p className="text-gray-500 mb-8">
                    View your personal account information.
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                    <h2 className="text-xl font-bold mb-2">
                        Personal Information
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Your registered account details.
                    </p>

                    <div className="mb-5">
                        <strong>Full Name</strong>
                        <p className="mt-2 text-gray-600">
                            {user?.name || 'Not available'}
                        </p>
                    </div>

                    <div className="mb-5">
                        <strong>Email Address</strong>
                        <p className="mt-2 text-gray-600">
                            {user?.email || 'Not available'}
                        </p>
                    </div>

                    <div>
                        <strong>Account ID</strong>
                        <p className="mt-2 text-gray-600">
                            {user?.id || 'Not available'}
                        </p>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-2">
                        Account Actions
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Manage your current session.
                    </p>

                    <form method="POST" action="/logout">
                        <input
                            type="hidden"
                            name="_token"
                            value={csrfToken || ''}
                        />

                        <button
                            type="submit"
                            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                        >
                            Log Out
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
