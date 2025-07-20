import React from 'react';

const styles = {
  section: {
    padding: '50px 20px',
    backgroundColor: 'white',
    textAlign: 'center',
    animation: 'fadeInSection 1s ease-out',
  },
  sectionTitle: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    fontSize: '1.1rem',
    lineHeight: 2,
  },
};

export default function Services() {
  return (
    <section id="services" style={styles.section}>
      <h2 style={styles.sectionTitle}>Our Services</h2>
      <ul style={styles.list}>
        <li>✔️ Personal Tax Filing</li>
        <li>✔️ Corporate Tax Preparation</li>
        <li>✔️ Tax Planning & Consulting</li>
      </ul>
    </section>
  );
}
