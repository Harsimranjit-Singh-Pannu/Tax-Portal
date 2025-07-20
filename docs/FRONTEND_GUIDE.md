# Frontend Guide

This document explains the React frontend structure and main components for the Tax Portal project.

---

## Folder Structure

- `/src/components` — React components grouped by feature (User, Admin, TaxDocs, etc.)
- `/src/contexts` — React context for user and admin authentication state
- `/src/App.js` — Main app routing and setup
- `/src/index.js` — React app entry point

---

## Key Components

### UserProfile

- Displays and updates the authenticated user's profile.
- Fetches profile data from backend on mount.
- Allows editing of name, phone, and address.
- Sends updated data back to backend using JWT for authentication.

### TaxDocuments

- Enables uploading PDF tax documents (base64 encoded).
- Uses `react-pdf` to preview uploaded documents.
- Allows deleting uploaded documents.
- Fetches all user documents on component load.

### AdminLogin

- Simple admin login with hardcoded credentials (`admin` / `123`).
- Uses `AuthContext` for managing admin authentication state.
- Redirects to admin dashboard on successful login.

---

## Authentication Flow

1. User/admin logs in and receives JWT token.
2. Token stored in browser's `localStorage`.
3. Protected API requests include the token in the `Authorization` header.
4. Backend verifies token validity.
5. Logout clears token and resets authentication state.

---

## Styling

- Uses inline styles for components with CSS-in-JS style objects.
- Styling is simple and clean, focusing on usability.

---
