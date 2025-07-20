import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Admin auth context
import { useUserAuth } from '../../contexts/UserAuthContext'; // User auth context
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAdmin, logout: adminLogout } = useAuth();
  const { isUserAuthenticated, userlogout } = useUserAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    if (isAdmin) {
      adminLogout();
    }
    if (isUserAuthenticated) {
      userlogout();
    }
    setDropdownOpen(false);
    navigate('/');
  };

  const handleNavClick = (sectionId) => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navBrand}>TaxCare Solutions</div>

      <div style={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
      </div>

      <ul
        style={{
          ...styles.navList,
          ...(mobileOpen ? styles.navListMobileOpen : styles.navListMobileClosed),
        }}
      >
        {/* Show this if NOT admin and NOT user logged in */}
        {!isAdmin && !isUserAuthenticated && (
          <>
            <li>
              <button onClick={() => handleNavClick('services')} style={styles.navLinkBtn}>
                Services
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('about')} style={styles.navLinkBtn}>
                About
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('contact')} style={styles.navLinkBtn}>
                Contact
              </button>
            </li>
            <li style={{ position: 'relative' }}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} style={styles.navLinkBtn}>
                Login ▾
              </button>
              {dropdownOpen && (
                <ul style={styles.dropdownMenu}>
                  <li>
                    <button onClick={() => navigate('/login')} style={styles.dropdownItem}>
                      Accountant
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate('/UserLogin')} style={styles.dropdownItem}>
                      User
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}

        {/* Show this if admin logged in */}
        {isAdmin && (
          <>
            <li>
              <button onClick={() => navigate('/admin')} style={styles.navLinkBtn}>
                Dashboard
              </button>
            </li>
            <li style={{ position: 'relative' }}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} style={styles.navLinkBtn}>
                Welcome, Admin ▾
              </button>
              {dropdownOpen && (
                <ul style={styles.dropdownMenu}>
                  <li>
                    <button onClick={handleLogout} style={styles.dropdownItem}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}

        {/* Show this if normal user logged in */}
        {isUserAuthenticated && !isAdmin && (
          <>
            <li>
              <button onClick={() => navigate('/user')} style={styles.navLinkBtn}>
                Dashboard
              </button>
            </li>
            <li style={{ position: 'relative' }}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} style={styles.navLinkBtn}>
                Welcome, User ▾
              </button>
              {dropdownOpen && (
                <ul style={styles.dropdownMenu}>
                  <li>
                    <button onClick={handleLogout} style={styles.dropdownItem}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#1e3a8a',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    color: 'white',
    zIndex: 1000,
  },
  navBrand: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  mobileToggle: {
    display: 'none',
    cursor: 'pointer',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    gap: '15px',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  navListMobileClosed: {
    display: 'flex',
  },
  navListMobileOpen: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '60px',
    right: '20px',
    backgroundColor: '#1e3a8a',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  navLinkBtn: {
    color: 'white',
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '8px 12px',
    textDecoration: 'none',
    transition: 'opacity 0.3s',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#1e3a8a',
    borderRadius: '4px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    zIndex: 999,
    padding: '5px 0',
    listStyle: 'none',
  },
  dropdownItem: {
    padding: '8px 16px',
    background: 'none',
    border: 'none',
    color: 'white',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
};

export default Navbar;
