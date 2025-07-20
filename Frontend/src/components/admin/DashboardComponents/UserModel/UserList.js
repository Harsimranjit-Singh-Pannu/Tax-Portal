// src/components/admin/UserList.js
import React, { useState, useEffect } from 'react';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';

const fakeUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password:'123', status: 'Active', registered: '2024-01-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password:'123', status: 'Inactive', registered: '2023-11-20' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', password:'123', status: 'Active', registered: '2024-03-15' },
  { id: 4, name: 'Alice Johnson', email: 'alice@example.com', password:'123', status: 'Active', registered: '2024-02-10' },
  { id: 5, name: 'Bob Lee', email: 'bob@example.com', password:'123', status: 'Inactive', registered: '2023-12-05' },
];

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  // Edit modal state
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editStatus, setEditStatus] = useState('Active');

  // Delete modal state
  const [deletingUser, setDeletingUser] = useState(null);

  useEffect(() => {
    setUsers(fakeUsers);
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.password.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPassword(user.password);
    setEditStatus(user.status);
  };

  const saveEdit = () => {
    setUsers(prev =>
      prev.map(u => u.id === editingUser.id ? { ...u, name: editName, email: editEmail, password: editPassword,status: editStatus } : u)
    );
    setEditingUser(null);
  };

  const openDeleteModal = (user) => {
    setDeletingUser(user);
  };

  const confirmDelete = () => {
    setUsers(prev => prev.filter(u => u.id !== deletingUser.id));
    setDeletingUser(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User Management</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Password</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Registered</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length === 0 ? (
            <tr><td colSpan="5" style={styles.noData}>No users found.</td></tr>
          ) : (
            currentUsers.map(user => (
              <tr key={user.id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.password}</td>
                <td style={styles.td}>{user.status}</td>
                <td style={styles.td}>{user.registered}</td>
                <td style={styles.td}>
                  <button style={styles.actionBtn} onClick={() => openEditModal(user)}>Edit</button>
                  <button
                    style={{ ...styles.actionBtn, backgroundColor: '#e53e3e' }}
                    onClick={() => openDeleteModal(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
          style={styles.pageBtn}
        >
          Prev
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
          style={styles.pageBtn}
        >
          Next
        </button>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          name={editName}
          email={editEmail}
          password={editPassword}
          status={editStatus}
          setName={setEditName}
          setEmail={setEditEmail}
          setPassword={setEditPassword}
          setStatus={setEditStatus}
          onSave={saveEdit}
          onClose={() => setEditingUser(null)}
          onCancel={() => setEditingUser(null)}
        />
      )}

      {deletingUser && (
        <DeleteUserModal
          user={deletingUser}
          onDelete={confirmDelete}
          onClose={() => setDeletingUser(null)}
          onCancel={() => setDeletingUser(null)}
        />
      )}
    </div>
  );
}

const styles = {
  searchInput: {
    padding: 8,
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
    fontSize: 16,
    boxSizing: 'border-box',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
    padding: '8px',
  },
  td: {
    borderBottom: '1px solid #eee',
    padding: '8px',
  },
  noData: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
  },
  actionBtn: {
    marginRight: 10,
    padding: '6px 12px',
    fontSize: 14,
    cursor: 'pointer',
    borderRadius: 4,
    border: 'none',
    backgroundColor: '#3182ce',
    color: 'white',
  },
  pagination: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageBtn: {
    padding: '6px 12px',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: 4,
    border: '1px solid #ccc',
    backgroundColor: 'white',
  },
};
