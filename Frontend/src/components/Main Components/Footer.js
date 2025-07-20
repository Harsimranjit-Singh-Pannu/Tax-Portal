import React from 'react';

const styles = {
  footer: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '20px 10px',
    textAlign: 'center',
    marginTop: '40px',
  },
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} TaxCare Solutions. All rights reserved.</p>
      
    </footer>
  );
}
