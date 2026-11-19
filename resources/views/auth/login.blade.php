
@extends('layouts.guest')

@section('title', 'Login | Personal Finance System')

@section('content')

    <h2>Welcome Back!</h2>
    <p class="auth-description">
        Sign in to access your personal finance dashboard.
    </p>

    @if ($errors->any())
        <div class="auth-errors">
            @foreach ($errors->all() as $error)
                <p>{{ $error }}</p>
            @endforeach
        </div>
    @endif

    <form action="{{ route('login.store') }}" method="POST">
        @csrf

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
            placeholder="Enter your password"
            required
        >

        <button type="submit" class="auth-button">
            Login
        </button>
    </form>

    <p class="auth-switch">
        Don't have an account?
        <a href="{{ route('register') }}">Create an account</a>
    </p>

@endsection
