// src/components/admin/Modal.js
import React from 'react';

export default function Modal({ children, onClose, showCancel, onCancel }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {children}
        <div style={{ marginTop: 15, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          {showCancel && (
            <button onClick={onCancel || onClose} style={styles.btn}>
              Cancel
            </button>
          )}
          <button onClick={onClose} style={styles.btn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '90%',
    maxWidth: 400,
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  btn: {
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: 4,
    border: 'none',
    backgroundColor: '#3182ce',
    color: 'white',
  },
};
