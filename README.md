# 🧾 Tax Accountant Portal

A full-stack web application for a tax accountant firm, built with **React**, **Node.js**, **Express**, and **MongoDB**. It supports user registration, authentication, document uploads, admin access, and inquiry messaging via **EmailJS**.
<img width="1904" height="908" alt="image" src="https://github.com/user-attachments/assets/e1d3db8d-183a-4958-955e-bb1588cf781f" />

---

## 🚀 Features

### 👤 User Features
- **Register/Login** with email and password
- 
<img width="1900" height="918" alt="image" src="https://github.com/user-attachments/assets/77cb4d38-4498-493c-b054-5260bc71346f" />

- **Dashboard** to upload/view/delete tax documents (PDFs only)
  
<img width="1901" height="915" alt="image" src="https://github.com/user-attachments/assets/f797ac75-720b-4298-afcc-87418f731fb0" />

- **Profile update** (name, contact, etc.)

  <img width="1905" height="912" alt="image" src="https://github.com/user-attachments/assets/9650953d-3ef1-4110-bafc-628cad435c8d" />

- **Send Messages** to accountant (chat)

<img width="1895" height="905" alt="image" src="https://github.com/user-attachments/assets/a2515915-5c3c-43e8-ba7f-cecdefd3c56f" />


### 👨‍💼 Admin Features
- Login with hardcoded credentials (can be expanded)
- Admin Dashboard see all users, their uploads, Messaging with users. Admin can set active, inactive users, update their info as well
<img width="1905" height="907" alt="image" src="https://github.com/user-attachments/assets/30b6eaa7-7167-4263-84fa-ac535bfa24b6" />

- Access to all users and their submitted documents (Later will fetch from DB)
<img width="1903" height="914" alt="image" src="https://github.com/user-attachments/assets/91dca837-960e-4702-92d0-91835f78ea20" />

-- Messaging system for chatting with users
<img width="1899" height="852" alt="image" src="https://github.com/user-attachments/assets/bc6c38e3-87c5-49bd-b1b7-53db2ed9d723" />

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

<img width="1894" height="914" alt="image" src="https://github.com/user-attachments/assets/15c20162-cf08-4cb8-a11c-603d9d2660e0" />


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
## API Overview
The backend API uses REST endpoints secured by JWT tokens for user-specific data.

| Endpoint               | Method | Description                         |
| ---------------------- | ------ | ----------------------------------- |
| `/api/auth/register`   | POST   | Register new user                   |
| `/api/auth/login`      | POST   | Login user and receive JWT          |
| `/api/profile`         | GET    | Get authenticated user's profile    |
| `/api/profile`         | POST   | Update authenticated user's profile |
| `/api/taxdocs/:userId` | GET    | Get all tax documents for a user    |
| `/api/taxdocs/:userId` | POST   | Upload a new tax document           |
| `/api/taxdocs/:docId`  | DELETE | Delete a specific tax document      |

##Security 

--Passwords are hashed using bcrypt.
--Authentication uses JWT tokens stored on client-side.
--Tokens are validated and checked against a token revocation list.
--Sensitive API routes require valid JWT tokens in the Authorization header.


## 🔐 Future Enhancements
- Admin dashboard to view user uploads
- Email verification on registration
- Password reset
- File storage in S3 or Firebase instead of base64

---

## 🛡️ License
This project is for educational/demo purposes.
