// src/components/admin/DeleteUploadModal.js
import React from 'react';
import Modal from '../UserModel/Modal';

export default function DeleteUploadModal({ upload, onDelete, onClose }) {
  return (
    <Modal onClose={onClose} showCancel={true} onCancel={onClose}>
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to delete <strong>{upload.filename}</strong>?</p>
      <button onClick={onDelete} style={styles.deleteBtn}>Delete</button>
    </Modal>
  );
}

const styles = {
  deleteBtn: {
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: 4,
    border: 'none',
    backgroundColor: '#e53e3e',
    color: 'white',
  },
};
