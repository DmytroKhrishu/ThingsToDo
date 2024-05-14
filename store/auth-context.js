import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useContext, useState } from 'react';
import { TasksContext } from './tasks-context';

export const AuthContext = createContext({
  token: '',
  userId: '',
  isAuthenticated: false,
  authenticate: (token, userId) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState('');
  const tasksCtx = useContext(TasksContext);

  function authenticate(token, userId, userEmail) {
    setAuthToken(token);
    setUserId(userId);
    setUserEmail(userEmail);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    setUserId(null);
    setUserEmail('');
    AsyncStorage.removeItem('token');
    tasksCtx.clearContext();
  }

  const value = {
    token: authToken,
    userId: userId,
    userEmail: userEmail,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
