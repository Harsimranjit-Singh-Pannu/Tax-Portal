import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Main Components/Navbar';
import Header from './components/Main Components/Header';
import Services from './components/Main Components/Services';
import About from './components/Main Components/About';
import ContactForm from './components/Main Components/ContactForm';
import Footer from './components/Main Components/Footer';
import axios from 'axios';
import AdminDashboard from './components/admin/DashboardComponents/Dashboard/AdminDashboard';
import MessagesAdmin from './components/admin/Messages/AdminMessages';
import UserDashboard from './components/Users/DashboardComponents/UserDashboard/UserDashboard';

import AdminLogin from './components/admin/login/Login';
import UserLogin from './components/Users/UserLogin/UserLogin';
import Register from './components/Users/UserRegister/Register';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserAuthProvider, useUserAuth } from './contexts/UserAuthContext';

axios.defaults.baseURL = 'http://localhost:5000';

// Admin protected route
function AdminProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// User protected route with loading check
function UserProtectedRoute({ children }) {
  const { isUserAuthenticated, loading } = useUserAuth();

  if (loading) return null; // or a spinner

  if (!isUserAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Redirect logged-in users from login page with loading check
function UserLoginRedirect({ children }) {
  const { isUserAuthenticated, loading } = useUserAuth();

  if (loading) return null; // or a spinner

  if (isUserAuthenticated) {
    return <Navigate to="/user" replace />;
  }
  return children;
}

export default function App() {
  const [users, setUsers] = useState([]);
  const [uploads, setUploads] = useState([]);

  const handleUserRegister = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  return (
    <AuthProvider>
      <UserAuthProvider>
        <Router>
          <div style={styles.container}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route
                path="/UserLogin"
                element={
                  <UserLoginRedirect>
                    <UserLogin />
                  </UserLoginRedirect>
                }
              />
              <Route path="/register" element={<Register onRegister={handleUserRegister} />} />
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/user"
                element={
                  <UserProtectedRoute>
                    <UserDashboard />
                  </UserProtectedRoute>
                }
              />
              <Route
                path="/admin/messages"
                element={
                  <AdminProtectedRoute>
                    <MessagesAdmin />
                  </AdminProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </UserAuthProvider>
    </AuthProvider>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f4f6f8',
    color: '#333',
    lineHeight: 1.6,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
};

function HomePage() {
  return (
    <>
      <Navbar />
      <Header />
      <Services />
      <About />
      <ContactForm />
      <Footer />
    </>
  );
}
