# Laravel CMS with React Admin Panel

A full-featured Content Management System (CMS) built with **Laravel 12**, **React**, **Vite**, **Laravel Sanctum**, and **CKEditor 5**.

---

# Features

## Authentication

* Laravel Sanctum Authentication
* Bearer Token Authentication
* Login / Logout
* Protected Routes
* Guest Routes

---

## User Management

* List Users
* Create User
* Edit User
* Delete User
* Assign Multiple Roles

---

## Role Management

* List Roles
* Create Roles
* Edit Roles
* Delete Roles
* Assign Multiple Privileges

---

## Privilege Management

* List Privileges
* Create Privileges
* Edit Privileges
* Delete Privileges

---

## Menu Management

* Nested Menu Structure
* Parent / Child Menus
* Unlimited Nesting
* Sort Order
* Menu Tree View

---

## Page Management

* Create Pages
* Edit Pages
* Delete Pages
* Restore Deleted Pages
* Permanently Delete Pages
* CKEditor 5 Integration
* Cover Image Upload
* Scheduled Publishing
* Draft & Published Status
* Slug Generation
* Menu Assignment
* Search
* Filtering
* Pagination

---

## Audit System

Every page stores:

* Created By
* Updated By
* Created At
* Updated At

---

## Soft Delete

Pages support:

* Soft Delete
* Trash
* Restore
* Force Delete

---

## Public APIs

* Public Menus
* Public Published Pages
* Public Page by Slug

---

# Technology Stack

## Backend

* PHP 8.3+
* Laravel 12
* Laravel Sanctum
* MySQL
* Swagger (L5 Swagger)

## Frontend

* React
* React Router DOM
* Axios
* Vite
* Tailwind CSS
* CKEditor 5

---

# Requirements

* PHP >= 8.3
* Composer
* Node.js >= 20
* npm
* MySQL 8+

---

# Installation

## Clone Repository

```bash
git clone <repository-url>

cd cms-project
```

---

## Install Backend Dependencies

```bash
composer install
```

---

## Install Frontend Dependencies

```bash
npm install
```

---

# Environment Configuration

Copy the environment file.

```bash
cp .env.example .env
```

Generate the application key.

```bash
php artisan key:generate
```

---

# Database Configuration

Update your `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cms-laravel
DB_USERNAME=root
DB_PASSWORD=
```

---

# Storage Link

Required for uploaded images.

```bash
php artisan storage:link
```

---

# Database Migration

```bash
php artisan migrate
```

---

# Database Seed

```bash
php artisan db:seed
```

The seeders create:

* Admin User
* Moderator User
* Roles
* Privileges
* Sample Menus
* Sample Pages

---

# Sanctum

Sanctum is used for API authentication.

Generate a token by logging in through:

```
POST /api/login
```

Use the returned Bearer Token for all protected endpoints.

---

# Swagger

Generate API documentation.

```bash
php artisan l5-swagger:generate
```

Swagger URL

```
http://localhost:8000/api/documentation
```

---

# Run Backend

```bash
php artisan serve
```

Backend URL

```
http://localhost:8000
```

---

# Run Frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# Default Login

## Admin

Email

```
admin@example.com
```

Password

```
password123
```

---

## Moderator

Email

```
moderator@example.com
```

Password

```
password
```

---

# Project Structure

```
app/
    Http/
    Models/
    Services/

database/
    migrations/
    seeders/

resources/

routes/

frontend/
    src/
        api/
        components/
        pages/
        routes/
```

---

# Available Modules

* Authentication
* Dashboard
* Users
* Roles
* Privileges
* Menus
* Pages
* Trash Management

---

# API Authentication

All protected endpoints require:

```
Authorization: Bearer YOUR_TOKEN
```

---

# Upload Directory

Uploaded images are stored in

```
storage/app/public/pages
```

Accessible through

```
public/storage
```

---

# Future Enhancements

* Dashboard Analytics
* Activity Logs
* Media Library
* Drag & Drop Menu Ordering
* Permission-Based Sidebar
* Rich Dashboard Charts
* Public React Website
* Email Notifications
* Multi-language Support
* Theme Management

---

# License

This project is intended for educational and portfolio purposes.
