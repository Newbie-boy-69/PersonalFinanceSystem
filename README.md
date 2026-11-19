# Personal Savings and Expense Monitoring System

A web-based personal finance management system built with Laravel and MySQL. It helps users record their income and expenses, manage budgets, track savings goals, and monitor their financial activities.

## Features

- **User Authentication** – Register, log in, and securely manage your account.
- **Dashboard** – View total income, expenses, current balance, and savings.
- **Category Management** – Create and manage income and expense categories.
- **Transaction Management** – Add, edit, view, and delete financial transactions.
- **Budget Management** – Set expense budgets and monitor spending.
- **Savings Goals** – Create savings targets and track progress.
- **Reports** – View monthly financial summaries, charts, and expense breakdowns.
- **How to Use** – Access instructions for using the system.

## Technologies Used

- PHP
- Laravel
- Blade Templates
- MySQL
- HTML
- CSS
- JavaScript
- Chart.js

## Requirements

Make sure you have the following installed:

- PHP
- Composer
- MySQL
- Node.js and npm
- Git

## Installation Guide

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Enter the Project Folder

```bash
cd PersonalFinanceSystem
```

### 3. Install PHP Dependencies

```bash
composer install
```

### 4. Install JavaScript Dependencies

```bash
npm install
```

### 5. Create Your Environment File

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 6. Generate the Application Key

```bash
php artisan key:generate
```

### 7. Create the Database

Open MySQL or phpMyAdmin and create a database named:

```text
personal_finance_db
```

### 8. Configure Your Database

Open the `.env` file and make sure your database settings match your local MySQL configuration.

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=personal_finance_db
DB_USERNAME=root
DB_PASSWORD=
```

Change the username and password if your MySQL setup uses different credentials.

### 9. Run Database Migrations

```bash
php artisan migrate
```

### 10. Build Frontend Assets

```bash
npm run build
```

### 11. Start the Application

```bash
composer run dev
```

Open your browser and visit:

```text
http://127.0.0.1:8000
```

## Important Notes

- Each user has their own financial records.
- Users must register or log in to access the system.
- The system requires manual entry of financial transactions.
- Do not upload your `.env` file or private database credentials to GitHub.
- Create a separate database for local testing.

## Project Purpose

This project aims to provide a simple and organized way for individuals to monitor their income, expenses, budgets, and savings goals through a web-based application.

---

**Personal Savings and Expense Monitoring System**  
Developed as an academic project.
