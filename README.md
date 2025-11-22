# 📘 Mini Property Booking Platform

A full-stack property booking system built with **Laravel (API)** and **React + Vite (Frontend)**, featuring:

* User authentication (Login/Register)
* Role-based access (Admin & Guest)
* Property listings, filtering, pagination
* Property details & availability display
* Bookings (guest side)
* Admin dashboard (CRUD for properties, availability, bookings)
* Fully protected routes

---

# 🚀 Features Overview

## **Guest / Unauthenticated Users**

* Can access only:

    * `/` → Public property list
    * `/login`
    * `/register`
* Attempting to access any other route redirects to `/login`.

## **Logged-in Users (Guests)**

* Can access:

    * `/`
    * `/properties/:id`
    * `/my-bookings`
* Can browse, view, and book properties.

## **Admins**

* Can access everything users can.
* Additionally:

    * Manage properties (create/update/delete)
    * Manage availability
    * View/manage all bookings
    * Admin Dashboard: `/admin/*`

---

# 🏗️ Tech Stack

### **Backend**

* Laravel 10+
* Laravel Sanctum (API auth)
* MySQL (or MariaDB)
* Eloquent ORM
* API Resources & Pagination

### **Frontend**

* React 18
* Vite
* React Router v6
* React Query (TanStack Query)
* TailwindCSS
* Axios
* Context API for Authentication

---

# 📁 Project Structure

### **Backend (Laravel)**

```
app/
  Http/
    Controllers/
      Api/
        AuthController.php
        PropertyController.php
    Resources/
      PropertyResource.php
  Models/
    Property.php
    Availability.php
    Booking.php
    User.php
  Filters/
    PropertyFilter.php
routes/
  api.php
database/
  migrations/
```

### **Frontend (React/Vite)**

```
src/
  app/
    App.jsx
    routes/
      AppRoutes.jsx
      RequireAuth.jsx
      RequireAdmin.jsx
    layouts/
      MainLayout.jsx
      AdminLayout.jsx
      Header.jsx
    providers/
      AppProviders.jsx
  
  features/
    auth/
      AuthContext.jsx
      api.js
      pages/LoginPage.jsx
      pages/RegisterPage.jsx
    properties/
      pages/PropertyListPage.jsx
      pages/PropertyDetailPage.jsx
      components/PropertyCard.jsx
      api.js
      hooks.js
    bookings/
      pages/MyBookingsPage.jsx
      api.js
    admin/
      pages/AdminPropertiesPage.jsx
      pages/AdminBookingsPage.jsx
      components/...
  
  common/
    components/
      layout/PageContainer.jsx
      ui/Button.jsx

  lib/
    axios.js
  config/
    env.js
```

---

# 🛠️ Local Development Setup

## **Backend (Laravel)**

### 1. Install dependencies

```bash
composer install
```

### 2. Create `.env` file

```bash
cp .env.example .env
```

### 3. Configure DB + SANCTUM + APP_URL

```
APP_URL=http://mpbplatform.test
SANCTUM_STATEFUL_DOMAINS=mpbplatform.test
SESSION_DOMAIN=mpbplatform.test
```

### 4. Generate app key

```bash
php artisan key:generate
```

### 5. Run migrations + seeders (if provided)

```bash
php artisan migrate --seed
```

### 6. Start local server

```bash
php artisan serve
```

Backend API base URL example:

```
http://mpbplatform.test/api
```

---

## **Frontend (React)**

### 1. Navigate to frontend folder

```bash
cd mpbp_frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```
VITE_API_URL=http://mpbplatform.test
```

### 4. Start dev server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔐 Authentication & Authorization

## Login Response Format (Expected)

```json
{
  "token": "TOKEN_STRING",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

## Role Logic

| Role               | Access                                 |
| ------------------ | -------------------------------------- |
| guest (logged out) | only `/`, `/login`, `/register`        |
| user (logged in)   | `/`, `/properties/:id`, `/my-bookings` |
| admin              | everything, including `/admin/*`       |

## Protected Route Rules

* Any route except `/`, `/login`, `/register` is wrapped in `<RequireAuth />`.
* Admin section additionally wrapped in `<RequireAdmin />`.

Example:

```jsx
<Route
  element={
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  }
>
  {/* user-only routes */}
</Route>

<Route
  path="/admin/*"
  element={
    <RequireAuth>
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    </RequireAuth>
  }
>
  {/* admin routes */}
</Route>
```

---

# 📡 API Endpoints

### **Auth**

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| POST   | `/api/login`    | Log in (returns token + user) |
| POST   | `/api/register` | Register new user             |
| GET    | `/api/me`       | Get logged-in user            |
| POST   | `/api/logout`   | Logout                        |

### **Properties**

| Method | Endpoint                                   |
| ------ | ------------------------------------------ |
| GET    | `/api/properties` (paginated + filterable) |
| GET    | `/api/properties/{id}`                     |
| POST   | `/api/properties` (admin)                  |
| PUT    | `/api/properties/{id}` (admin)             |
| DELETE | `/api/properties/{id}` (admin)             |

### **Availability**

| POST/PUT/DELETE | `/api/availabilities/*` (admin only) |

### **Bookings**

| GET | `/api/my-bookings` |
| POST | `/api/bookings` |
| GET | `/api/bookings` (admin only) |

---

# 🎨 Frontend Behavior Summary

### Public (not logged in)

* Sees only:

    * `/`
    * `/login`
    * `/register`

### Logged-in User

* Sees:

    * Explore page
    * My Bookings
    * Property Details
    * Logout

### Admin

* In addition sees:

    * Admin → Properties
    * Admin → Bookings

### Property List

* Full pagination from Laravel
* Filters:

    * location
    * min price
    * max price
    * start_date / end_date

### Property Detail

* Images, description, amenities
* Availability periods

---

# 🚢 Deployment

## **Laravel Deployment**

1. Upload files → server (or use Forge/Vapor).
2. Set `.env` for production.
3. Run:

```bash
composer install --optimize-autoloader --no-dev
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

4. Point domain to Laravel `public/`.

## **React/Vite Deployment**

Build React for production:

```bash
npm run build
```

The build output is in:

```
dist/
```

You can host it on:

* Nginx/Apache (point to `/dist`)
* Netlify
* Vercel
* Hostinger static hosting

Make sure the environment variable is correct:

```
VITE_API_URL=https://your-backend-domain.com
```

---

# 🧩 Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Submit pull request

---

# 📄 License

This project is open-source and free to use for educational + commercial purposes unless specified otherwise.
