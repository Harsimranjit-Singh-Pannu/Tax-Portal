
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Main Components/Navbar';
import Footer from '../../Main Components//Footer';
import Register from '../../Users/UserRegister/Register'; // eslint-disable-next-line


export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login({ username, password });
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

 return (
  <div style={styles.pageWrapper}>
    <Navbar />
    <div style={styles.container}>
      <h2 style={styles.title}>Accoutant Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>Email</label>
      <input
        type="text"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={styles.input}
      />
      <label style={styles.label}>Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Login
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
   <Footer />
  </div>
);
}
const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  container: {
    flex: 1,
    maxWidth: 400,
    margin: '40px auto',
    padding: 30,
    backgroundColor: 'white',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    borderRadius: 8,
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e3a8a',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    border: '1px solid #ccc',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: 12,
    border: 'none',
    borderRadius: 5,
    fontSize: 16,
    cursor: 'pointer',
    fontWeight: '600',
  },
};