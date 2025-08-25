// src/services/providers/AuthContext.jsx

import { createContext, useContext, useState } from 'react';
import { saveUser, clearUser, getUser } from '../auth/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => getUser());

  const setUser = (userData) => {
    setUserState(userData);
    saveUser(userData);
  };

  const logout = () => {
    clearUser();
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
