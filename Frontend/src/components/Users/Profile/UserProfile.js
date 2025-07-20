import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile({ currentUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser && currentUser._id) {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No auth token found');

          const res = await axios.get('/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setFormData({
            name: res.data.name || '',
            email: currentUser.email || '',
            phone: res.data.phone || '',
            address: res.data.address || '',
          });
        } catch (err) {
          console.error('Failed to fetch profile:', err);
        }
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !currentUser._id) return alert("No user ID found.");

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found');

      await axios.post(
        '/api/profile',
        {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Profile updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} style={styles.input} />

        <label>Email</label>
        <input name="email" value={formData.email} disabled style={styles.input} />

        <label>Phone</label>
        <input name="phone" value={formData.phone} onChange={handleChange} style={styles.input} />

        <label>Address</label>
        <input name="address" value={formData.address} onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.button}>Save Changes</button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '20px auto', padding: 20, backgroundColor: 'white', borderRadius: 8 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { padding: 10, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' },
  button: { padding: 12, backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' },
};
