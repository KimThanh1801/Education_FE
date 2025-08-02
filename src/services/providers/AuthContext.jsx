import { createContext, useContext , useState } from 'react';
import { saveUser, clearUser, getUser } from '../auth/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => getUser());

  const setUser = (userData) => {
    setUserState(userData);
    saveUser(userData);
  }

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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

