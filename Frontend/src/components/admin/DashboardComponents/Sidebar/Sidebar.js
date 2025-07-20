import React from 'react';

const styles = {
  sidebar: {
    width: '220px',
    backgroundColor: '#1e3a8a',
    color: 'white',
    height: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
  },
  navItem: {
    padding: '10px 15px',
    cursor: 'pointer',
    marginBottom: '10px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  active: {
    backgroundColor: '#2563eb',
  },
};

export default function Sidebar({ active, onSelect, menuItems, title }) {
  return (
    <div style={styles.sidebar}>
      <h2>{title}</h2>
      {menuItems.map((item) => (
        <div
          key={item}
          style={{
            ...styles.navItem,
            ...(active === item ? styles.active : {}),
          }}
          onClick={() => onSelect(item)}
          onMouseEnter={e => {
            if (active !== item) e.currentTarget.style.backgroundColor = '#375bb5';
          }}
          onMouseLeave={e => {
            if (active !== item) e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
