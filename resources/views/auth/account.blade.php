
@extends('layouts.app')

@section('title', 'My Account')

@section('content')

    <div class="page-title">
        <h1>My Account</h1>
        <p>View your personal account information.</p>
    </div>

    <div class="card">

        <h2>Personal Information</h2>

        <p style="color: #64748b; margin: 8px 0 20px;">
            Your registered account details.
        </p>

        <div style="margin-bottom: 20px;">
            <strong>Full Name</strong>
            <p style="margin-top: 8px;">
                {{ Auth::user()->name }}
            </p>
        </div>

        <div style="margin-bottom: 20px;">
            <strong>Email Address</strong>
            <p style="margin-top: 8px;">
                {{ Auth::user()->email }}
            </p>
        </div>

        <div style="margin-bottom: 20px;">
            <strong>Account ID</strong>
            <p style="margin-top: 8px;">
                {{ Auth::user()->id }}
            </p>
        </div>

    </div>

    <div class="card">

        <h2>Account Actions</h2>

        <p style="color: #64748b; margin: 8px 0 20px;">
            Manage your current session.
        </p>

        <form action="{{ route('logout') }}" method="POST">
            @csrf

            <button
                type="submit"
                style="background: #dc2626;"
            >
                Log Out
            </button>
        </form>

    </div>

@endsection
