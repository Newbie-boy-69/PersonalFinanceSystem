# Personal Savings and Expense Monitoring System

A web-based personal finance management system built using Laravel, React, Inertia.js, and MySQL. It helps users manage their income, expenses, budgets, savings goals, and financial activities.

## Features

- **User Authentication** – Register, log in, and manage your account.
- **Dashboard** – View total income, expenses, balance, and savings.
- **Category Management** – Create and manage income and expense categories.
- **Transaction Management** – Add, edit, view, and delete transactions.
- **Budget Management** – Set budgets and monitor spending.
- **Savings Goals** – Create savings targets, add savings, and track progress.
- **Reports** – View monthly financial summaries, charts, and expense breakdowns.
- **Account Management** – View account information and log out.
- **How to Use** – Access instructions for using the system.

## Technologies Used

**Backend**
- PHP
- Laravel

**Frontend**
- React
- Inertia.js
- JavaScript
- Tailwind CSS
- Chart.js

**Database**
- MySQL

**Development Tools**
- Vite
- Node.js and npm
- Composer
- Git

## Requirements

- PHP
- Composer
- MySQL
- Node.js and npm
- Git

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Newbie-boy-69/PersonalFinanceSystem.git
```

### 2. Enter the Project Folder

```bash
cd PersonalFinanceSystem
```

### 3. Install Dependencies

```bash
composer install
npm install
```

### 4. Create the Environment File

```powershell
Copy-Item .env.example .env
```

### 5. Generate the Application Key

```bash
php artisan key:generate
```

### 6. Create the Database

Create a MySQL database named:

`personal_finance_db`

### 7. Configure the Database

Update your `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=personal_finance_db
DB_USERNAME=root
DB_PASSWORD=
```

Adjust the username and password based on your MySQL configuration.

### 8. Run Database Migrations

```bash
php artisan migrate
```

### 9. Build Frontend Assets

```bash
npm run build
```

### 10. Start the Application

```bash
composer run dev
```

Open your browser and visit:

`http://localhost:8000`

## Project Structure

- `app/` – Laravel backend logic, controllers, and models.
- `resources/js/` – React application, pages, and layouts.
- `resources/views/app.blade.php` – Main Inertia application template.
- `routes/web.php` – Application routes.
- `database/` – Database migrations and seeders.
- `public/` – Public assets and compiled frontend files.

## Important Notes

- Each user has their own financial records.
- Users must log in to access protected features.
- Financial transactions must be entered manually.
- Never upload your `.env` file or private database credentials to GitHub.
- Create a separate database for local testing.

## Project Purpose

This project aims to provide a simple and organized way for individuals to monitor their income, expenses, budgets, and savings goals through a web-based application.

---

**Personal Savings and Expense Monitoring System**

Developed as an academic project.