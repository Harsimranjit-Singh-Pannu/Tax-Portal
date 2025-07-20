import React, { useState } from 'react';
import UploadModal from './UploadModal';
import DeleteUploadModal from './DeleteUploadModal';

export default function UploadList() {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com' }
  ]);

  const [uploads, setUploads] = useState([
    {
      id: 1,
      filename: 'tax-return-2023.pdf',
      uploadedAt: '2025-06-28',
      uploadedBy: users[0],
      type: 'application/pdf',
      size: 245678, // in bytes
    },
    {
      id: 2,
      filename: 'investment-2025.pdf',
      uploadedAt: '2025-06-29',
      uploadedBy: users[1],
      type: 'application/pdf',
      size: 312456,
    },
    {
      id: 3,
      filename: 'gst-q2-report.jpg',
      uploadedAt: '2025-06-29',
      uploadedBy: users[0],
      type: 'image/jpeg',
      size: 498765,
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleAddUpload = (newUpload) => {
    setUploads(prev => [...prev, newUpload]);
    setShowUploadModal(false);
    setCurrentPage(1);
  };

  const handleDeleteUpload = () => {
    setUploads(prev => prev.filter(u => u.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handlePreview = (filename) => {
    alert(`Pretend preview/download of: ${filename}`);
  };

  // Filtering logic
  const filteredUploads = uploads.filter(upload => {
    const matchesSearch =
      upload.filename.toLowerCase().includes(search.toLowerCase()) ||
      upload.uploadedBy.name.toLowerCase().includes(search.toLowerCase());

    const matchesUser =
      selectedUserId === '' || upload.uploadedBy.id === parseInt(selectedUserId);

    return matchesSearch && matchesUser;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUploads.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentUploads = filteredUploads.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div style={{ padding: 20 }}>
      <h2>Uploads</h2>

      {/* Controls */}
      <div style={{ marginBottom: 15, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button onClick={() => setShowUploadModal(true)}>Add Upload</button>
        <input
          type="text"
          placeholder="Search by filename or user"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', width: '250px' }}
        />
        <select
          value={selectedUserId}
          onChange={e => {
            setSelectedUserId(e.target.value);
            setCurrentPage(1);
          }}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
        >
          <option value="">All Users</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      {/* Uploads list */}
      {currentUploads.length === 0 ? (
        <p>No uploads found.</p>
      ) : (
        <ul style={{ paddingLeft: 0 }}>
          {currentUploads.map(upload => (
            <li
              key={upload.id}
              style={{
                margin: '10px 0',
                listStyle: 'none',
                borderBottom: '1px solid #ddd',
                paddingBottom: 8,
              }}
            >
              <span
                onClick={() => handlePreview(upload.filename)}
                style={{ cursor: 'pointer', color: '#1e3a8a', textDecoration: 'underline' }}
                title={`Type: ${upload.type}\nSize: ${formatSize(upload.size)}`}
              >
                {upload.filename}
              </span>
              <div style={{ fontSize: '0.9rem', color: '#555' }}>
                Uploaded by: <b>{upload.uploadedBy.name}</b> on {upload.uploadedAt} <br />
                <small>Type: {upload.type || 'Unknown'} | Size: {formatSize(upload.size)}</small>
              </div>
              <button
                style={{
                  marginTop: 5,
                  padding: '4px 8px',
                  backgroundColor: '#e53e3e',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
                onClick={() => setDeleteTarget(upload)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            ◀ Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                backgroundColor: currentPage === i + 1 ? '#1e3a8a' : '#f0f0f0',
                color: currentPage === i + 1 ? 'white' : '#333',
                border: 'none',
                padding: '4px 10px',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next ▶
          </button>
        </div>
      )}

      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleAddUpload}
          users={users}
        />
      )}

      {deleteTarget && (
        <DeleteUploadModal
          upload={deleteTarget}
          onDelete={handleDeleteUpload}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
