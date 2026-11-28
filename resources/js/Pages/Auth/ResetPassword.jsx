import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function ResetPassword({ token, email }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { data, setData, post, processing, errors } = useForm({ token, email, password: '', password_confirmation: '' });
    const submit = (e) => { e.preventDefault(); post('/reset-password'); };

    return <AuthLayout>
        <h2 className="text-slate-800 text-xl font-bold mb-2">Create a new password</h2>
        <p className="text-slate-500 text-sm mb-6">Choose a new password for your account.</p>
        {Object.keys(errors).length > 0 && <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-5 text-sm">{Object.values(errors).flat().map((err, i) => <p key={i}>{err}</p>)}</div>}
        <form onSubmit={submit}>
            <label className="block font-bold text-slate-700 text-sm mb-2">Email Address</label>
            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} required className="w-full p-3 border border-slate-300 rounded-lg mb-4 text-sm" />
            <label className="block font-bold text-slate-700 text-sm mb-2">New Password</label>
            <div className="relative mb-4"><input type={showPassword ? 'text' : 'password'} value={data.password} onChange={e => setData('password', e.target.value)} required minLength={8} autoComplete="new-password" className="w-full p-3 pr-16 border border-slate-300 rounded-lg text-sm" placeholder="At least 8 characters" /><button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 inset-y-0 text-sm font-semibold text-slate-500">{showPassword ? 'Hide' : 'Show'}</button></div>
            <label className="block font-bold text-slate-700 text-sm mb-2">Confirm Password</label>
            <div className="relative mb-5"><input type={showConfirmation ? 'text' : 'password'} value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} required autoComplete="new-password" className="w-full p-3 pr-16 border border-slate-300 rounded-lg text-sm" /><button type="button" onClick={() => setShowConfirmation(v => !v)} className="absolute right-3 inset-y-0 text-sm font-semibold text-slate-500">{showConfirmation ? 'Hide' : 'Show'}</button></div>
            <button disabled={processing} className="w-full p-[13px] bg-blue-600 text-white rounded-lg text-[15px] font-bold hover:bg-blue-700 transition disabled:opacity-60">{processing ? 'Updating...' : 'Reset Password'}</button>
        </form>
    </AuthLayout>;
}
