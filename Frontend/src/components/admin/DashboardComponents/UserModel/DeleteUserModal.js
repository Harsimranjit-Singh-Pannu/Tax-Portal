// src/components/admin/DeleteUserModal.js
import React from 'react';
import Modal from './Modal';

export default function DeleteUserModal({ user, onDelete, onClose, onCancel }) {
  return (
    <Modal onClose={onClose}  onCancel={onCancel} showCancel={true} >
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to delete user <b>{user.name}</b>?</p>
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
