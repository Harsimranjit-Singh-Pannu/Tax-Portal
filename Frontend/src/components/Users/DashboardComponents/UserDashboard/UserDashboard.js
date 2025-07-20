import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../Main Components/Navbar';
import Footer from '../../../Main Components/Footer';
import Sidebar from '../Sidebar/Sidebar';
import UserProfile from '../../Profile/UserProfile';
import TaxDocuments from '../../TaxDocs/TaxDocuments';
import Messages from '../../Messages/Messages';

const styles = {
  container: {
    display: 'flex',
    height: 'calc(100vh - 120px)',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f4f6f8',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
  },
};

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState('Profile');
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([
    { from: 'accountant', text: 'Hello Simran, how can I help?' },
    { from: 'user', text: 'Hi accountant!' },
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Axios should already have default Authorization header set in your UserAuthProvider
    axios.get('/api/auth/profile')
      .then(res => {
        setCurrentUser(res.data);
      })
      .catch(err => {
        console.error('Failed to load user profile:', err);
      });
  }, []);

  const sendMessage = (msg) => {
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: msg }]);
  };

  const updateUser = (updatedFields) => {
    if (!currentUser?._id) return;

    axios.post(`/api/profile/${currentUser._id}`, updatedFields)
      .then(() => {
        setCurrentUser(prev => ({ ...prev, ...updatedFields }));
        alert('Profile updated!');
      })
      .catch(err => {
        console.error('Error updating profile:', err);
        alert('Failed to update.');
      });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Profile':
        return <UserProfile currentUser={currentUser} updateUser={updateUser} />;
      case 'Tax Docs':
        return <TaxDocuments />;
      case 'Messages':
        return (
          <Messages
            messages={messages}
            onSendMessage={sendMessage}
            isAdminView={false}
          />
        );
      default:
        return <div>Select a section from sidebar</div>;
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <Sidebar
          active={activeSection}
          onSelect={setActiveSection}
          menuItems={['Profile', 'Tax Docs', 'Messages']}
          title="User Panel"
        />
        <main style={styles.content}>
          {currentUser ? renderContent() : <div>Loading profile...</div>}
        </main>
      </div>
      <Footer />
    </>
  );
}
