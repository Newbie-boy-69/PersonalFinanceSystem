
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
                background: #f4f6f9;
                color: #333;
            }

            /* =========================
            NAVIGATION BAR
            ========================= */

            
    /* Navigation */

    /* =========================
    NAVIGATION BAR
    ========================= */

    .navbar {
        background: #1e293b;
        color: white;
        padding: 18px 30px;
        position: relative;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 70px;
    }

    .navbar h2 {
        font-size: 20px;
        white-space: nowrap;
        flex-shrink: 0;
    }

    /* Right-side controls */
    .nav-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-left: auto;
        flex-shrink: 0;
        white-space: nowrap;
    }

    /* Hamburger stays at the far right of the menu */
    .menu-toggle {
        order: 3;
        background: transparent;
        color: white;
        border: 1px solid #64748b;
        border-radius: 6px;
        padding: 8px 12px;
        font-size: 25px;
        cursor: pointer;
        line-height: 1;
        flex-shrink: 0;
    }

    .menu-toggle:hover {
        background: #334155;
    }

    /* Links expand to the LEFT of hamburger */
    .nav-links {
        order: 2;
        display: flex;
        align-items: center;
        gap: 5px;
        flex-direction: row;
        flex-wrap: nowrap;

        max-width: 0;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;

        white-space: nowrap;
        flex-shrink: 0;

        transition:
            max-width 0.45s ease,
            opacity 0.3s ease,
            visibility 0.3s ease;
    }

    .nav-links.open {
        max-width: 1000px;
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }

    .nav-links > a,
    .nav-actions > a {
        color: white;
        text-decoration: none;
        padding: 9px 10px;
        border-radius: 6px;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .nav-links > a:hover,
    .nav-actions > a:hover {
        background: #334155;
        color: #38bdf8;
    }

    /* How to Use sits before the expanding links */
    .how-to-use {
        order: 1;
    }

    /* Account stays last */
    .account-link {
        order: 4;
        border: 1px solid #64748b;
        border-radius: 6px;
    }

    /* Responsive */
    @media (max-width: 900px) {
        .navbar {
            padding: 15px 20px;
            gap: 8px;
        }

        .navbar h2 {
            font-size: 16px;
        }

        .nav-actions {
            gap: 5px;
        }

        .nav-actions > a,
        .nav-links > a {
            font-size: 12px;
            padding: 8px;
        }

        .menu-toggle {
            font-size: 20px;
            padding: 7px 9px;
        }
    }

    @media (max-width: 480px) {
        .navbar {
            padding: 12px 10px;
        }

        .navbar h2 {
            font-size: 12px;
        }

        .nav-actions {
            gap: 3px;
        }

        .nav-actions > a,
        .nav-links > a {
            font-size: 11px;
            padding: 6px;
        }

        .menu-toggle {
            font-size: 18px;
            padding: 6px 8px;
        }
    }


/* =========================
   GLOBAL PAGE LAYOUT
========================= */

body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 25px;
    flex: 1;
}

/* =========================
   PAGE HEADINGS
========================= */

.page-title {
    margin-bottom: 25px;
}

.page-title h1 {
    color: #1e293b;
    font-size: 28px;
    margin-bottom: 8px;
}

.page-title p {
    color: #64748b;
    font-size: 15px;
}

/* =========================
   CARDS
========================= */

.card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    margin-bottom: 20px;
}

.card h2 {
    color: #1e293b;
    margin-bottom: 10px;
}

.card h3 {
    color: #475569;
    margin-bottom: 10px;
}

/* =========================
   FORMS
========================= */

form label {
    display: block;
    font-weight: bold;
    color: #334155;
    margin: 15px 0 7px;
}

form input,
form select,
form textarea {
    width: 100%;
    padding: 11px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 7px;
    font-size: 14px;
    font-family: inherit;
    background: white;
    color: #333;
    margin-bottom: 12px;
}

form input:focus,
form select:focus,
form textarea:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

/* Submit buttons only, so the navbar hamburger is unaffected */
form button[type="submit"] {
    background: #2563eb;
    color: white;
    border: none;
    padding: 11px 18px;
    border-radius: 7px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 8px;
}

form button[type="submit"]:hover {
    background: #1d4ed8;
}

/* =========================
   TABLES
========================= */

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
}

thead {
    background: #f1f5f9;
}

th,
td {
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

th {
    color: #334155;
    font-size: 14px;
}

td {
    color: #475569;
    font-size: 14px;
}

tbody tr:hover {
    background: #f8fafc;
}

/* =========================
   MESSAGES
========================= */

.success {
    background: #dcfce7;
    color: #166534;
    padding: 13px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
}

/* =========================
   FOOTER
========================= */

.footer {
    background: #1e293b;
    color: white;
    text-align: center;
    padding: 18px;
    margin-top: auto;
    font-size: 14px;
}

/* =========================
   RESPONSIVE TABLES
========================= */

@media (max-width: 600px) {
    .container {
        padding: 0 12px;
        margin: 20px auto;
    }

    .card {
        padding: 16px;
    }

    .page-title h1 {
        font-size: 23px;
    }

    th,
    td {
        padding: 10px;
        font-size: 12px;
    }
}

        </style>
    </head>

    <body>

        <!-- NAVIGATION BAR -->
        

    <nav class="navbar" id="navbar">

        <h2>Personal Finance System</h2>

        <div class="nav-actions">

            <a href="{{ url('/how-to-use') }}" class="how-to-use">
                How to Use
            </a>

            <div class="nav-links" id="navLinks">
                <a href="{{ route('dashboard') }}">Dashboard</a>
                <a href="{{ route('categories.index') }}">Categories</a>
                <a href="{{ route('transactions.index') }}">Transactions</a>
                <a href="{{ route('budgets.index') }}">Budgets</a>
                <a href="{{ route('savings-goals.index') }}">Savings</a>
                <a href="{{ route('reports.index') }}">Reports</a>
            </div>

            <button
                type="button"
                class="menu-toggle"
                id="menuToggle"
                aria-label="Open navigation menu"
                aria-expanded="false"
            >
                ☰
            </button>

            <a href="{{ url('/account') }}" class="account-link">
                Account
            </a>

        </div>

    </nav>

        <!-- MAIN CONTENT -->
        <main class="container">

            @if (session('success'))
                <div class="success">
                    {{ session('success') }}
                </div>
            @endif

            @yield('content')

        </main>

        <!-- FOOTER -->
        <footer class="footer">
            Personal Savings and Expense Monitoring System
        </footer>

        <!-- NAVIGATION JAVASCRIPT -->
        <script>
            const navbar = document.getElementById('navbar');
            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');

            function openMenu() {
                navLinks.classList.add('open');
                navbar.classList.add('menu-open');

                menuToggle.textContent = '✕';
                menuToggle.setAttribute('aria-expanded', 'true');
                menuToggle.setAttribute(
                    'aria-label',
                    'Close navigation menu'
                );
            }

            function closeMenu() {
                navLinks.classList.remove('open');
                navbar.classList.remove('menu-open');

                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute(
                    'aria-label',
                    'Open navigation menu'
                );
            }

            menuToggle.addEventListener('click', function () {
                if (navLinks.classList.contains('open')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            // Close after selecting a navigation link.
            navLinks.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', closeMenu);
            });

            // Close when clicking outside the navbar.
            document.addEventListener('click', function (event) {
                if (!navbar.contains(event.target)) {
                    closeMenu();
                }
            });

            // Close using Escape.
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    closeMenu();
                }
            });
        </script>

        @stack('scripts')

    </body>
    </html>
