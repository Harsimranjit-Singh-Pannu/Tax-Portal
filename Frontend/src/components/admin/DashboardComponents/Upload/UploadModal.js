import React, { useState } from 'react';

export default function UploadModal({ onClose, onUpload, users = [] }) {
  const [file, setFile] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg'];

  // Format bytes to KB/MB string
  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      alert('Only PDF and JPEG/JPG files are allowed.');
      e.target.value = ''; // Reset file input
      setFile(null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      alert('File size must be below 5 MB.');
      e.target.value = '';
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file || !selectedUserId) {
      alert('Please select a file and user.');
      return;
    }

    // Find user object by id safely
    const user = users.find(u => u.id === Number(selectedUserId));
    if (!user) {
      alert('Selected user not found.');
      return;
    }

    onUpload({
      id: Date.now(),
      filename: file.name,
      uploadedAt: new Date().toISOString().slice(0, 10),
      uploadedBy: user, // store full user object for easy display
      type: file.type,
      size: file.size,
    });

    setFile(null);
    setSelectedUserId('');
    onClose();
  };

  return (
    <div style={modalStyles.backdrop}>
      <div style={modalStyles.modal}>
        <h3>Add Upload</h3>
        <form onSubmit={handleSubmit}>
          <div style={modalStyles.field}>
            <label>Choose File (PDF or JPEG, max 5MB):</label><br />
            <input
              type="file"
              accept=".pdf,image/jpeg,image/jpg"
              onChange={handleFileChange}
              style={modalStyles.input}
              required
            />
            {file && (
              <small style={{ fontStyle: 'italic' }}>
                Selected: {file.name} ({file.type || 'Unknown type'}, {formatSize(file.size)})
              </small>
            )}
          </div>
          <div style={modalStyles.field}>
            <label>Uploaded By:</label><br />
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              required
              style={modalStyles.input}
            >
              <option value="">Select user</option>
              {Array.isArray(users) && users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
          <button type="submit" style={modalStyles.button}>Upload</button>
          <button
            type="button"
            onClick={onClose}
            style={{ ...modalStyles.button, marginLeft: 10, backgroundColor: '#ccc', color: '#333' }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const modalStyles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 6,
    width: 340,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  field: {
    marginBottom: 12,
  },
  input: {
    width: '100%',
    padding: 6,
    fontSize: 14,
    boxSizing: 'border-box',
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};
