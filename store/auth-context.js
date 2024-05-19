import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';

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
  const [isTryingLogin, setIsTryingLogin] = useState(false);


  function authenticate(token, userId, userEmail) {
    try {
      setIsTryingLogin(true);
      setAuthToken(token);
      setUserId(userId);
      setUserEmail(userEmail);
      AsyncStorage.setItem('token', token);
      AsyncStorage.setItem('userId', userId);
      setIsTryingLogin(false);
    } catch (error) {
      Alert.alert('Error', error);
    }
    if (isTryingLogin) {
      return <LoadingOverlay />;
    }
  }

  function logout() {
    setAuthToken(null);
    setUserId(null);
    setUserEmail('');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userId');
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
