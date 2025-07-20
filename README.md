# 🧾 Tax Accountant Portal

A full-stack web application for a tax accountant firm, built with **React**, **Node.js**, **Express**, and **MongoDB**. It supports user registration, authentication, document uploads, admin access, and inquiry messaging via **EmailJS**.
<img width="1904" height="908" alt="image" src="https://github.com/user-attachments/assets/e1d3db8d-183a-4958-955e-bb1588cf781f" />

---

## 🚀 Features

### 👤 User Features
- **Register/Login** with email and password
- **Dashboard** to upload/view/delete tax documents (PDFs only)
- **Profile update** (name, contact, etc.)
- **Send inquiries** to accountant (via EmailJS)

### 👨‍💼 Admin Features
- Login with hardcoded credentials (can be expanded)
- Access to all users and their submitted documents (coming soon)

---

## 🗂️ Tech Stack

### Frontend:
- React
- React Router
- Axios
- React-PDF
- EmailJS

### Backend:
- Node.js
- Express
- MongoDB Atlas
- JWT Authentication

---

## 🔐 Authentication

### Users:
- Registered and authenticated via MongoDB using JWT tokens.
- Tokens stored in local storage.

### Admin:
- Simple login with hardcoded credentials (e.g., `admin` / `123`)
- Can be extended later using a separate Admin collection.

---

## 📁 File Upload (Tax Documents)

- Users can upload PDFs (stored as base64 strings in MongoDB).
- Document preview using `react-pdf`.
- Users can delete previously uploaded documents.

---

## 📨 User Inquiries (EmailJS)

Users can send inquiries directly to the accountant using a contact form.

### 🧾 Fields:
- Name
- Email
- Message

### 📬 How It Works:
- Inquiry form uses **EmailJS** to send emails without backend.
- Email is delivered directly to the accountant’s inbox.

### 🔧 Setup Instructions:
1. Sign up at [https://emailjs.com](https://emailjs.com).
2. Create:
   - A **service**
   - An **email template**
   - Get your **public key**
3. In your frontend `.env` file or JS config:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

---

## ⚙️ Getting Started

### 🔧 Backend
1. Install dependencies:
   ```bash
   cd Backend
   npm install
   ```
2. Create `.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection
   JWT_SECRET=your_secret
   ```
3. Start server:
   ```bash
   npm start
   ```

### 💻 Frontend
1. Install dependencies:
   ```bash
   cd Frontend
   npm install
   ```
2. Create `.env` for EmailJS and PDF worker:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. Start frontend:
   ```bash
   npm start
   ```

---

## 📦 Folder Structure (Simplified)

```
/Backend
  /routes
    auth.js
    profile.js
    taxdocs.js
  /models
    User.js
    TaxDoc.js
  JWT/
    authMiddleware.js
  server.js

/Frontend
  /components
    /Users
    /Admin
    /Main Components
  /contexts
    UserAuthContext.js
    AuthContext.js
  App.js
  index.js
```

---

## 🔐 Future Enhancements
- Admin dashboard to view user uploads
- Email verification on registration
- Password reset
- File storage in S3 or Firebase instead of base64

---

## 🛡️ License
This project is for educational/demo purposes.
