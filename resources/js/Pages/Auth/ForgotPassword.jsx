import { useForm, Link, usePage } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function ForgotPassword() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({ email: '' });
    const submit = (e) => { e.preventDefault(); post('/forgot-password'); };

    return <AuthLayout>
        <h2 className="text-slate-800 text-xl font-bold mb-2">Forgot your password?</h2>
        <p className="text-slate-500 text-sm mb-6">Enter the email address linked to your account. If email delivery is configured, we'll send you a reset link.</p>
        {flash?.status && <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 text-sm">{flash.status}</div>}
        {flash?.error && <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4 text-sm">{flash.error}</div>}
        {errors.email && <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4 text-sm">{errors.email}</div>}
        <form onSubmit={submit}>
            <label className="block font-bold text-slate-700 text-sm mb-2">Email Address</label>
            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} required autoComplete="email" placeholder="Enter your email" className="w-full p-3 border border-slate-300 rounded-lg mb-5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
            <button disabled={processing} className="w-full p-[13px] bg-blue-600 text-white rounded-lg text-[15px] font-bold hover:bg-blue-700 transition disabled:opacity-60">{processing ? 'Sending...' : 'Send Password Reset Link'}</button>
        </form>
        <p className="text-center mt-5 text-sm"><Link href="/login" className="text-blue-600 font-bold hover:underline">Back to Login</Link></p>
    </AuthLayout>;
}
