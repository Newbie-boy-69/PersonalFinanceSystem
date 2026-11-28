import { useForm, Link, Head } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <AuthLayout>
            <Head title="Register" />

            <h2 className="text-slate-800 text-xl font-bold mb-2">
                Create Your Account
            </h2>

            <p className="text-slate-500 text-sm mb-6">
                Register to start managing your personal finances.
            </p>

            {Object.keys(errors).length > 0 && (
                <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-5 text-sm">
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}

            <form onSubmit={submit}>
                <label className="block font-bold text-slate-700 text-sm mb-2">
                    Full Name
                </label>

                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                    className="w-full p-3 border border-slate-300 rounded-lg mb-[18px] text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <label className="block font-bold text-slate-700 text-sm mb-2">
                    Email Address
                </label>

                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Enter your email address"
                    required
                    autoComplete="email"
                    className="w-full p-3 border border-slate-300 rounded-lg mb-[18px] text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <label className="block font-bold text-slate-700 text-sm mb-2">
                    Password
                </label>

                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Create a password"
                    required
                    autoComplete="new-password"
                    className="w-full p-3 border border-slate-300 rounded-lg mb-[18px] text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <label className="block font-bold text-slate-700 text-sm mb-2">
                    Confirm Password
                </label>

                <input
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    placeholder="Confirm your password"
                    required
                    autoComplete="new-password"
                    className="w-full p-3 border border-slate-300 rounded-lg mb-[18px] text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full p-[13px] bg-blue-600 text-white rounded-lg text-[15px] font-bold hover:bg-blue-700 hover:-translate-y-0.5 transition disabled:opacity-60"
                >
                    {processing ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <p className="text-center mt-[22px] text-slate-500 text-sm">
                Already have an account?{' '}
                <Link
                    href="/login"
                    className="text-blue-600 font-bold hover:underline"
                >
                    Login
                </Link>
            </p>
        </AuthLayout>
    );
}
