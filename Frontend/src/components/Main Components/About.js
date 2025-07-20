import React from 'react';

const styles = {
  sectionAlt: {
    padding: '50px 20px',
    backgroundColor: '#e5e7eb',
    textAlign: 'center',
    animation: 'fadeInSection 1s ease-out',
  },
  sectionTitle: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  text: {
    maxWidth: '600px',
    margin: '0 auto',
  },
};

export default function About() {
  return (
    <section id="about" style={styles.sectionAlt}>
      <h2 style={styles.sectionTitle}>About Us</h2>
      <p style={styles.text}>
        We are experienced tax professionals helping individuals and businesses
        with reliable, accurate tax services for over 10 years.
      </p>
    </section>
  );
}
