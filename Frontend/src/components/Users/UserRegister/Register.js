import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Main Components/Navbar';
import Footer from '../../Main Components/Footer';
import UserLogin from '../UserLogin/UserLogin';

export default function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  //const [phone, setPhone] = useState('');
  const [password, setPassword] =useState('');
const navigate = useNavigate(); // ✅ This is missing
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !password) return alert("All fields are required.");

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully!");
      setName('');
      setEmail('');
      //setPhone('');
      setPassword('');
      navigate('/UserLogin');
    } else {
      alert(data.message || 'Registration failed.');
    }

  } catch (err) {
    console.error("Error during registration:", err);
    alert("Something went wrong.");
  }
};


  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Create Your Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Name</label>
          <input
            style={styles.input}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />

          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="string"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p >Already have an account ?</p><button style={styles.button} onClick={() => navigate('/UserLogin')}> Login</button>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    maxWidth: 400,
    margin: '40px auto',
    padding: 30,
    backgroundColor: 'white',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    borderRadius: 8,
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
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
    transition: 'border-color 0.3s',
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
    transition: 'background-color 0.3s',
  },
};
