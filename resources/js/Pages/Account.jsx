import { useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

const inputClass = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100';

export default function Account() {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const fileRef = useRef(null);
    const { data, setData, post, delete: destroy, processing, errors, recentlySuccessful } = useForm({
        name: user?.name || '', email: user?.email || '', profile_photo: null, current_password: '', password: '', password_confirmation: '', _method: 'put',
    });
    const photoPreview = data.profile_photo ? URL.createObjectURL(data.profile_photo) : user?.profile_photo_url;
    const [clientPhotoError, setClientPhotoError] = useState('');
    // Laravel/PHP reliably parses multipart uploads via POST with method spoofing.
    const submitWithMethodSpoofing = (e) => { e.preventDefault(); setClientPhotoError(''); post('/account', { forceFormData: true, onSuccess: () => { setData('profile_photo', null); setData('current_password',''); setData('password',''); setData('password_confirmation',''); if (fileRef.current) fileRef.current.value = ''; } }); };
    const errorText = (field) => errors[field] ? <span className="mt-1 block text-sm font-normal text-red-600">{errors[field]}</span> : null;
    const removePhoto = () => { if (confirm('Remove your profile picture?')) destroy('/account/profile-photo'); };
    return <AppLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        <div><h1 className="text-3xl font-bold tracking-tight text-slate-900">Account Settings</h1><p className="mt-2 text-slate-500">Manage your profile and security information.</p></div>
        {flash?.success && <div className="rounded-xl bg-emerald-50 p-4 text-emerald-700">{flash.success}</div>}
        <form onSubmit={submitWithMethodSpoofing} className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Profile picture</h2><p className="mt-1 text-sm text-slate-500">JPG, PNG, or WEBP · Max 2 MB</p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">{photoPreview ? <img src={photoPreview} alt="Profile preview" className="h-full w-full object-cover"/> : (user?.name||'U').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase()}</div>
              <div className="flex flex-wrap gap-3"><button type="button" onClick={()=>fileRef.current?.click()} className="rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-white hover:bg-emerald-700">Choose picture</button>{user?.profile_photo_url && <button type="button" onClick={removePhoto} className="rounded-xl border border-slate-200 px-4 py-2.5 font-semibold text-slate-600 hover:bg-slate-50">Remove picture</button>}<input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e=>{ const file=e.target.files?.[0]; setClientPhotoError(''); if (!file) { setData('profile_photo',null); return; } if (!['image/jpeg','image/png','image/webp'].includes(file.type)) { setClientPhotoError('Choose a JPG, PNG, or WEBP image.'); e.target.value=''; setData('profile_photo',null); return; } if (file.size > 2*1024*1024) { setClientPhotoError('The image must be 2 MB or smaller.'); e.target.value=''; setData('profile_photo',null); return; } setData('profile_photo',file); }}/></div>
            </div>{clientPhotoError && <span className="mt-2 block text-sm text-red-600">{clientPhotoError}</span>}{errorText('profile_photo')}
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="text-lg font-semibold text-slate-900">Personal information</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium text-slate-700">Full name<input className={inputClass} value={data.name} onChange={e=>setData('name',e.target.value)} required/>{errorText('name')}</label><label className="text-sm font-medium text-slate-700">Email address<input type="email" className={inputClass} value={data.email} onChange={e=>setData('email',e.target.value)} required/>{errorText('email')}</label></div>
            <p className="mt-5 text-sm text-slate-500">Account ID: {user?.id}</p>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="text-lg font-semibold text-slate-900">Change password</h2><p className="mt-1 text-sm text-slate-500">Leave these fields blank if you don't want to change your password.</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-3"><label className="text-sm font-medium text-slate-700">Current password<input type="password" className={inputClass} autoComplete="current-password" value={data.current_password} onChange={e=>setData('current_password',e.target.value)}/>{errorText('current_password')}</label><label className="text-sm font-medium text-slate-700">New password<input type="password" className={inputClass} autoComplete="new-password" value={data.password} onChange={e=>setData('password',e.target.value)}/>{errorText('password')}</label><label className="text-sm font-medium text-slate-700">Confirm password<input type="password" className={inputClass} autoComplete="new-password" value={data.password_confirmation} onChange={e=>setData('password_confirmation',e.target.value)}/></label></div>
          </section>
          <div className="flex items-center gap-4"><button disabled={processing} className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60">{processing?'Saving...':'Save changes'}</button>{recentlySuccessful&&<span className="text-sm text-emerald-700">Saved successfully.</span>}</div>
        </form>
      </div>
    </AppLayout>;
}
