# API Reference

This document describes the backend API endpoints for the Tax Portal project.

---

## Authentication (`/api/auth`)

| Endpoint    | Method | Description                 | Request Body                     | Response                                |
|-------------|--------|-----------------------------|---------------------------------|----------------------------------------|
| `/register` | POST   | Register a new user          | `{ name, email, password }`      | `{ message: 'User registered successfully' }` or error |
| `/login`    | POST   | Login user & receive JWT token | `{ email, password }`             | `{ token, user: { id, name, email } }` or error           |

---

## Profile (`/api/profile`)

> Requires `Authorization: Bearer <token>` header on all requests.

| Endpoint    | Method | Description                       | Request Body                         | Response                            |
|-------------|--------|---------------------------------|------------------------------------|-----------------------------------|
| `/profile`  | GET    | Get authenticated user's profile | None                               | User profile JSON or error         |
| `/profile`  | POST   | Update authenticated user's profile | `{ name, phone, address }`           | Updated profile JSON or error      |

---

## Tax Documents (`/api/taxdocs`)

| Endpoint         | Method | Description                 | Request Body                     | Response                            |
|------------------|--------|-----------------------------|---------------------------------|-----------------------------------|
| `/:userId`       | POST   | Upload a tax document        | `{ fileName, fileUrl }`           | Saved document JSON or error       |
| `/:userId`       | GET    | Get all tax documents for user | None                            | List of tax documents or error     |
| `/:docId`        | DELETE | Delete a tax document         | None                            | Confirmation message or error      |

---

## Authentication Flow

1. User registers or logs in to receive a JWT token.
2. JWT token is sent in the `Authorization` header for protected routes.
3. Backend validates JWT and returns the requested data or an error.

---
