
@extends('layouts.guest')

@section('title', 'Create Account | Personal Finance System')

@section('content')

    <h2>Create Your Account</h2>
    <p class="auth-description">
        Register to start managing your personal finances.
    </p>

    @if ($errors->any())
        <div class="auth-errors">
            @foreach ($errors->all() as $error)
                <p>{{ $error }}</p>
            @endforeach
        </div>
    @endif

    <form action="{{ route('register.store') }}" method="POST">
        @csrf

        <label for="name">Full Name</label>
        <input
            type="text"
            id="name"
            name="name"
            value="{{ old('name') }}"
            placeholder="Enter your full name"
            required
        >

        <label for="email">Email Address</label>
        <input
            type="email"
            id="email"
            name="email"
            value="{{ old('email') }}"
            placeholder="Enter your email address"
            required
        >

        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            required
        >

        <label for="password_confirmation">Confirm Password</label>
        <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            placeholder="Confirm your password"
            required
        >

        <button type="submit" class="auth-button">
            Create Account
        </button>
    </form>

    <p class="auth-switch">
        Already have an account?
        <a href="{{ route('login') }}">Login</a>
    </p>

@endsection
