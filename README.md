# Laravel CMS

A modern Content Management System (CMS) built with **Laravel 12**, **React (Vite)**, **Laravel Sanctum**, and **Swagger (OpenAPI)**.

---

# Features

## Backend

- Laravel 12 REST API
- Laravel Sanctum Authentication
- Role Based Access Control (RBAC)
- Privilege Based Authorization
- CRUD for Pages
- CRUD for Menus
- CRUD for Users
- CRUD for Roles
- CRUD for Privileges
- Soft Delete & Restore Pages
- Dashboard Statistics API
- Public Website API
- Swagger API Documentation
- API Resource Responses
- Request Validation
- Service Layer Architecture
- Image Upload Support
- Slug Generation
- Translation API (English / Arabic)
- Audit Logging Support
- Created By / Updated By Tracking

---

## Frontend (Admin)

- React + Vite
- Authentication
- Dashboard
- Statistics
- Page Management
- Menu Management
- User Management
- Role Management
- Privilege Management
- Protected Routes
- Privilege Protected Pages
- Responsive UI
- English / Arabic Language Support

---

## Public Website

- Dynamic Navigation Menu
- Dynamic Pages
- Page Details
- Public REST API
- Dynamic Routing using Page Slugs

---

# Technologies

## Backend

- Laravel 12
- Sanctum
- MySQL
- Swagger (L5 Swagger)

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Lucide Icons

---

# Installation

## Clone Repository

```bash
git clone https://github.com/AmarDev2055/CMS-Laravel-Assignment.git

cd laravel-cms
```

---

# Backend Setup

```bash
cd backend

composer install
```

Copy environment file

```bash
cp .env.example .env
```

Generate key

```bash
php artisan key:generate
```

Configure database inside

```
.env
```

Run migrations

```bash
php artisan migrate
```

Seed database

```bash
php artisan db:seed
```

Create storage link

```bash
php artisan storage:link
```

Start server

```bash
php artisan serve
```

Backend URL

```
http://localhost:8000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# Seeded Login Accounts

## Administrator

Email

```
admin@example.com
```

Password

```
password
```

Privileges

- Full Access
- User Management
- Role Management
- Privilege Management
- Menu Management
- Page Management

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

Privileges

- List Pages
- Create Pages
- Edit Pages
- Manage Menus

---

# API Authentication

## Login

```
POST /api/login
```

### Example Request

```json
{
    "email": "admin@example.com",
    "password": "password"
}
```

### Example Response

```json
{
    "token": "1|xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "user": {
        "id": 1,
        "name": "Admin",
        "email": "admin@example.com"
    }
}
```

Copy the token.

---

## Swagger Authorization

Open Swagger

```
http://localhost:8000/api/documentation
```

Click **Authorize**

Enter

```
Bearer 1|xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Example

```
Bearer 1|2yHsd8d4f2abcaYx1mM5P8V8kL9Qw...
```

Click

```
Authorize
```

You can now access all protected endpoints.

---

# Swagger Documentation

Available at

```
http://localhost:8000/api/documentation
```

---

# Public API

## Get Public Pages

```
GET /api/public/pages
```

---

## Get Page by Slug

```
GET /api/public/pages/{slug}
```

Example

```
GET /api/public/pages/about-us
```

---

## Get Public Menu

```
GET /api/public/menus
```

---

# Default API Endpoints

Authentication

```
POST /api/login
POST /api/logout
GET /api/user
```

Dashboard

```
GET /api/dashboard
```

Pages

```
GET /api/pages
POST /api/pages
PUT /api/pages/{id}
DELETE /api/pages/{id}
POST /api/pages/{id}/restore
```

Menus

```
GET /api/menus
POST /api/menus
PUT /api/menus/{id}
DELETE /api/menus/{id}
```

Users

```
GET /api/users
POST /api/users
PUT /api/users/{id}
DELETE /api/users/{id}
```

Roles

```
GET /api/roles
POST /api/roles
PUT /api/roles/{id}
DELETE /api/roles/{id}
```

Privileges

```
GET /api/privileges
POST /api/privileges
PUT /api/privileges/{id}
DELETE /api/privileges/{id}
```

---

# Architecture

```
Controllers
      │
      ▼
Services
      │
      ▼
Models
      │
      ▼
Database
```

The application follows a Service Layer Architecture to keep controllers clean and business logic reusable.

---

# Authorization

Authentication is handled using Laravel Sanctum.

Authorization uses Role-Based Access Control (RBAC) with Privileges.

Example privileges include:

- list-pages
- create-pages
- edit-pages
- delete-pages
- restore-pages
- manage-users
- manage-roles
- manage-privileges
- manage-menus

Routes are protected using the custom `CheckPrivilege` middleware.

---

# Internationalization

The CMS supports:

- English
- Arabic

Translations are served through the Laravel Translation API and consumed by the React frontend.

---

# Audit Features

The CMS records:

- Created By
- Updated By

Each page stores:

- creator
- last updater
- timestamps

---

# Testing

Run the test suite using:

```bash
php artisan serve
```

Or

```bash
vendor/bin/phpunit
```

---

# Author

Developed as a full-stack Laravel CMS using Laravel 12 and React.
