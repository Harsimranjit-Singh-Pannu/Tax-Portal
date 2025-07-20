import React, { useState } from 'react';
import Navbar from '../../../Main Components/Navbar';
import Footer from '../../../Main Components/Footer';
import Sidebar from '../Sidebar/Sidebar';
import UserList from '../UserModel/UserList';
import UploadList from '../Upload/UploadList';
import Settings from '../settings/Settings';
import MessagesAdmin from '../../Messages/AdminMessages';

const styles = {
  container: {
    display: 'flex',
    height: 'calc(100vh - 120px)', // adjust height to exclude navbar + footer
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f4f6f8',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
  },
};

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('Users');

  const renderContent = () => {
    switch (activeSection) {
      case 'Users':
        return <UserList />;
      case 'Uploads':
        return <UploadList />;
      case 'Settings':
        return <Settings />;
      case 'Messages':
        return <MessagesAdmin />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <Sidebar
          active={activeSection}
          onSelect={setActiveSection}
          menuItems={['Users', 'Uploads', 'Settings', 'Messages']}
          title="Admin Panel"
        />
        <main style={styles.content}>{renderContent()}</main>
      </div>
      <Footer />
    </>
  );
}
