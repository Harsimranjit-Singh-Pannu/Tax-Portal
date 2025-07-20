// src/components/admin/Settings.js
import React, { useState } from 'react';

export default function Settings() {
  const [name, setName] = useState('Admin');
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }
    // Simulate saving settings
    setMessage('Settings saved successfully!');
    // Clear password fields
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h2>Admin Settings</h2>
      <form onSubmit={handleSave}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />
        </label>
        <br />
        <button type="submit" style={buttonStyle}>Save Settings</button>
      </form>
      {message && <p style={{ marginTop: 15, color: 'green' }}>{message}</p>}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '5px 0 15px',
  boxSizing: 'border-box',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#1e3a8a',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};
