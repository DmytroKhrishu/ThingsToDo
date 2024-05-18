import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppState } from '@react-native-community/hooks';
import { createContext, useContext, useEffect, useState } from 'react';
import { TasksContext } from './tasks-context';

export const AuthContext = createContext({
  token: '',
  userId: '',
  userEmail: '',
  isAuthenticated: false,
  authenticate: (token, userId, userEmail) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const tasksCtx = useContext(TasksContext);

  const appState = useAppState();

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        logout();
      }
    };

    checkToken();
  }, [appState]);

  function authenticate(token, userId, userEmail) {
    setAuthToken(token);
    setUserId(userId);
    setUserEmail(userEmail);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('userId', userId);
  }

  function logout() {
    setAuthToken(null);
    setUserId(null);
    setUserEmail('');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userId');
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
