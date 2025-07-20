import React, { useState, useEffect, useRef } from 'react';

// Helper to format date nicely
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Messages({ messages = [], onSendMessage, isAdminView = false }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.messagesContainer}>
        {messages.length === 0 && <p style={styles.noMessages}>No messages yet.</p>}

        {messages.map((msg, index) => {
          const fromUser = msg.from === 'user';
          const initials = fromUser
            ? 'U'
            : isAdminView
            ? 'A'
            : 'C'; // U=user, A=accountant/admin, C=accountant normal user view

          return (
            <div
              key={index}
              style={{
                ...styles.messageRow,
                justifyContent: fromUser ? 'flex-start' : 'flex-end',
              }}
            >
              {fromUser && (
                <div style={styles.avatar}>
                  {initials}
                </div>
              )}

              <div
                style={{
                  ...styles.messageBubble,
                  backgroundColor: fromUser ? '#d1e7dd' : '#cfe2ff',
                  fontWeight: !fromUser && isAdminView ? '600' : '400',
                }}
              >
                <div style={styles.messageText}>{msg.text}</div>
                <div style={styles.timestamp}>{msg.timestamp ? formatTime(new Date(msg.timestamp)) : ''}</div>
              </div>

              {!fromUser && (
                <div style={styles.avatar}>
                  {initials}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <textarea
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={styles.textarea}
          rows={2}
        />
        <button onClick={handleSend} style={styles.sendButton} type="button">
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // fill parent's height fully
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  noMessages: {
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 8,
    maxWidth: '75%',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: '#1e3a8a',
    color: 'white',
    fontWeight: '700',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    fontSize: 14,
  },
  messageBubble: {
    padding: '10px 15px',
    borderRadius: 16,
    wordBreak: 'break-word',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    fontSize: 15,
    lineHeight: 1.3,
    position: 'relative',
  },
  messageText: {
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 11,
    color: '#555',
    textAlign: 'right',
  },
  inputContainer: {
    marginTop: 10,
    display: 'flex',
    gap: 10,
  },
  textarea: {
    flex: 1,
    borderRadius: 8,
    border: '1px solid #ccc',
    padding: 10,
    fontSize: 14,
    resize: 'none',
    fontFamily: 'inherit',
    minHeight: 50,
  },
  sendButton: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    padding: '0 20px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
    transition: 'background-color 0.2s',
  },
};
