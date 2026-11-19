
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Personal Finance System')</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background: #f1f5f9;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .auth-container {
            width: 100%;
            max-width: 430px;
        }

        .auth-brand {
            text-align: center;
            margin-bottom: 25px;
        }

        .auth-brand h1 {
            color: #1e293b;
            font-size: 27px;
            margin-bottom: 8px;
        }

        .auth-brand p {
            color: #64748b;
            font-size: 14px;
        }

        .auth-card {
            background: white;
            padding: 35px;
            border-radius: 14px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }

        .auth-card h2 {
            color: #1e293b;
            margin-bottom: 8px;
        }

        .auth-description {
            color: #64748b;
            margin-bottom: 25px;
            font-size: 14px;
        }

        .auth-card label {
            display: block;
            font-weight: bold;
            color: #334155;
            margin-bottom: 7px;
            font-size: 14px;
        }

        .auth-card input {
            width: 100%;
            padding: 12px;
            border: 1px solid #cbd5e1;
            border-radius: 7px;
            margin-bottom: 18px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .auth-card input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .auth-button {
            width: 100%;
            padding: 13px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 7px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
        }

        .auth-button:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
        }

        .auth-switch {
            text-align: center;
            margin-top: 22px;
            color: #64748b;
            font-size: 14px;
        }

        .auth-switch a {
            color: #2563eb;
            font-weight: bold;
            text-decoration: none;
        }

        .auth-switch a:hover {
            text-decoration: underline;
        }

        .auth-errors {
            background: #fee2e2;
            color: #991b1b;
            padding: 12px;
            border-radius: 7px;
            margin-bottom: 20px;
            font-size: 14px;
        }

        .auth-errors p + p {
            margin-top: 5px;
        }

        .auth-footer {
            text-align: center;
            color: #94a3b8;
            font-size: 12px;
            margin-top: 22px;
        }
    </style>
</head>
<body>

    <div class="auth-container">

        <div class="auth-brand">
            <h1>Personal Finance System</h1>
            <p>Manage your money. Track your progress. Reach your goals.</p>
        </div>

        <main class="auth-card">
            @yield('content')
        </main>

        <div class="auth-footer">
            Personal Savings and Expense Monitoring System
        </div>

    </div>

</body>
</html>
