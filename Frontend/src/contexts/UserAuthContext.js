import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserAuthContext = createContext();

export function useUserAuth() {
  return useContext(UserAuthContext);
}

export function UserAuthProvider({ children }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsUserAuthenticated(true);
      setUserData(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const userlogin = async ({ email, password }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      if (res.data && res.data.user && res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

        setIsUserAuthenticated(true);
        setUserData(res.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const userlogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setIsUserAuthenticated(false);
    setUserData(null);
  };

  return (
    <UserAuthContext.Provider
      value={{
        isUserAuthenticated,
        userData,
        userlogin,
        userlogout,
        loading,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}
