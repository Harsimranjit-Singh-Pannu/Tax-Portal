// src/components/admin/EditUserModal.js
import React from 'react';
import Modal from './Modal';

export default function EditUserModal({ user, name, email, password, status, setName, setEmail,setPassword, setStatus, onSave, onClose, onCancel }) {
  return (
    <Modal onClose={onClose} showCancel={true} onCancel={onCancel}>
      <h3>Edit User</h3>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
      </label>
      <br />
      <label>
        Status:
        <select value={status} onChange={e => setStatus(e.target.value)} style={styles.input}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>
      <br />
      <button onClick={onSave} style={styles.saveBtn}>Save</button>
    </Modal>
  );
}

const styles = {
  input: {
    width: '100%',
    padding: 6,
    marginTop: 5,
    marginBottom: 15,
    boxSizing: 'border-box',
  },
  saveBtn: {
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: 4,
    border: 'none',
    backgroundColor: '#3182ce',
    color: 'white',
  },
};
