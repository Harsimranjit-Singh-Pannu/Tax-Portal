import React from 'react';

const styles = {
  header: {
    background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
    color: 'white',
    padding: '80px 20px',
    textAlign: 'center',
    animation: 'fadeInSection 1s ease-out',
  },
  heading: {
    fontSize: '3rem',
    margin: '0 0 10px',
  },
  subheading: {
    fontSize: '1.25rem',
    margin: 0,
  },
};

export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.heading}>Trusted Tax Professionals</h1>
      <p style={styles.subheading}>Expert tax solutions for individuals and businesses</p>
    </header>
  );
}
