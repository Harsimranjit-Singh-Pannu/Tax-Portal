import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../contexts/UserAuthContext';
import Navbar from '../../Main Components/Navbar';
import Footer from '../../Main Components/Footer';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { userlogin } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const success = await userlogin({ email, password });

      if (success) {
        console.log('User logged in successfully');
        navigate('/user'); // Navigate to user dashboard after login
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>User Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            required
            style={styles.input}
          />
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
          {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        </form>
        <p>Not registered?</p>
        <button style={styles.button} onClick={() => navigate('/Register')}>Register</button>
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
