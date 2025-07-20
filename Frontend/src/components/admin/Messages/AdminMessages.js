import React, { useState } from 'react';
import Messages from '../../Users/Messages/Messages'; // Reuse message component

const demoUsers = [
  { id: 1, name: 'Simran Pannu' },
  { id: 2, name: 'John Doe' },
];

export default function MessagesAdmin() {
  const [selectedUser, setSelectedUser] = useState(demoUsers[0]);
  const [search, setSearch] = useState('');
  const [chatHistory, setChatHistory] = useState({
    1: [
      { from: 'user', text: 'Hi accountant!' },
      { from: 'accountant', text: 'Hello Simran, how can I help?' },
    ],
    2: [
      { from: 'user', text: 'Hello there!' },
      { from: 'accountant', text: 'Hi John, what do you need?' },
    ],
  });

  const sendMessage = (msg) => {
    if (!msg.trim()) return;
    setChatHistory((prev) => {
      const userChats = prev[selectedUser.id] || [];
      return {
        ...prev,
        [selectedUser.id]: [...userChats, { from: 'accountant', text: msg }],
      };
    });
  };

  const filteredUsers = demoUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3 style={{ marginTop: 0, marginBottom: 10 }}>Users</h3>
        <input
          type="text"
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchBox}
        />
        <div style={styles.userList}>
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              style={{
                ...styles.userItem,
                backgroundColor:
                  selectedUser.id === user.id ? '#2563eb' : '#2a459c',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  selectedUser.id === user.id ? '#2563eb' : '#375bb5')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  selectedUser.id === user.id ? '#2563eb' : '#2a459c')
              }
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div style={styles.chatArea}>
        <div style={styles.chatHeader}>
          <h2 style={{ margin: 0 }}>Chat with {selectedUser.name}</h2>
        </div>
        <div style={styles.chatContent}>
          <Messages
            messages={chatHistory[selectedUser.id] || []}
            onSendMessage={sendMessage}
            isAdminView={true}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: 'calc(100vh - 120px)', // account for navbar/footer if needed
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f4f6f8',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  searchBox: {
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
  },
  userList: {
    flex: 1,
    overflowY: 'auto',
  },
  userItem: {
    padding: '10px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '10px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: 'white',
    userSelect: 'none',
    transition: 'background-color 0.2s',
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  chatHeader: {
    backgroundColor: '#fff',
    padding: '10px 15px',
    borderRadius: '8px 8px 0 0',
    borderBottom: '1px solid #ddd',
  },
  chatContent: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
};
