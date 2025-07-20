import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

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
  form: {
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  textarea: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  button: {
    padding: '12px',
    backgroundColor: '#1e3a8a',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  debug: {
    marginTop: '10px',
    whiteSpace: 'pre-wrap',
    backgroundColor: '#f1f1f1',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '12px',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default function ContactForm() {
  const formRef = useRef();
  const [statusMessage, setStatusMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    if (!publicKey) {
      console.error('Missing REACT_APP_EMAILJS_PUBLIC_KEY');
      setDebugInfo('Error: Missing EmailJS public key in environment variables.');
    } else {
      emailjs.init(publicKey);
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const adminTemplateId = process.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID;
    const replyTemplateId = process.env.REACT_APP_EMAILJS_REPLY_TEMPLATE_ID;

    if (!serviceId || !adminTemplateId || !replyTemplateId) {
      setDebugInfo('Missing service/template IDs');
      return;
    }

    emailjs.sendForm(serviceId, adminTemplateId, formRef.current).then(
      (result) => {
        console.log('Email to admin sent:', result.text);
        setStatusMessage('Thanks! Your message has been sent.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);

        emailjs.sendForm(serviceId, replyTemplateId, formRef.current).catch((err) => {
          console.error('Auto-reply error:', err.text);
        });

        e.target.reset();
      },
      (error) => {
        console.error('Admin email error:', error.text);
        setStatusMessage('Something went wrong. Please try again later.');
      }
    );
  };

  return (
    <section id="contact" style={styles.section}>
      <h2 style={styles.sectionTitle}>Contact Us</h2>
      <form ref={formRef} onSubmit={sendEmail} style={styles.form}>
        <input type="text" name="user_name" placeholder="Your Name" style={styles.input} required />
        <input type="email" name="user_email" placeholder="Your Email" style={styles.input} required />
        <textarea name="message" placeholder="Message" rows={5} style={styles.textarea} required />
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
      {debugInfo && <pre style={styles.debug}>{debugInfo}</pre>}
      {showToast && <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#22c55e',
        color: 'white',
        padding: '12px 18px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 10000,
        animation: 'fadein 0.3s ease-out',
      }}>{statusMessage}</div>}
    </section>
  );
}
