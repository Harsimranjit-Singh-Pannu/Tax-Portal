import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

export default function TaxDocuments() {
  const [previews, setPreviews] = useState([]);

  // Fetch token once from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    // Load existing taxdocs from backend (no userId in URL)
    axios.get('/api/taxdocs', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setPreviews(res.data))
      .catch(err => console.error('Failed to fetch taxdocs', err));
  }, [token]);

  const handleFileChange = async (e) => {
    if (!token) {
      alert('Not authenticated');
      return;
    }
    const selectedFiles = Array.from(e.target.files);

    for (const file of selectedFiles) {
      if (file.type === 'application/pdf') {
        const reader = new FileReader();

        reader.onloadend = async () => {
          const fileUrl = reader.result;

          try {
            const res = await axios.post('/api/taxdocs', {
              fileName: file.name,
              fileUrl, // base64 data URI
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });

            setPreviews(prev => [...prev, res.data.doc]);
          } catch (err) {
            console.error('Error saving taxdoc:', err);
            alert('Failed to upload');
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleDelete = async (index, docId) => {
    if (!token) {
      alert('Not authenticated');
      return;
    }

    try {
      await axios.delete(`/api/taxdocs/${docId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPreviews(previews.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Could not delete document.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>My Tax Documents</h2>

      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        style={styles.input}
      />

      <ul style={styles.list}>
        {previews.map((doc, index) => (
          <li key={doc._id || index} style={styles.listItem}>
            <div style={{ flex: 1 }}>
              <strong>{doc.fileName}</strong>
              <div style={{ marginTop: '10px' }}>
                <Document file={doc.fileUrl}>
                  <Page pageNumber={1} width={250} />
                </Document>
              </div>
            </div>
            <button onClick={() => handleDelete(index, doc._id)} style={styles.deleteBtn}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  input: {
    marginBottom: '15px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #ddd',
  },
  deleteBtn: {
    backgroundColor: '#e11d48',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    height: 'fit-content',
  },
};
