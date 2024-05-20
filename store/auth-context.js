import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';
import { createUser, login } from '../util/auth';

export const AuthContext = createContext({
  token: '',
  userId: '',
  userEmail: '',
  isAuthenticated: false,
  isTryingLogin: false,
  authenticate: (token, userId, userEmail) => {},
  loginHandler: ({ email, password }) => {},
  signupHandler: ({ email, password }) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [isTryingLogin, setIsTryingLogin] = useState(false);
  

  function authenticate(token, userId, userEmail) {
    try {
      setAuthToken(token);
      setUserId(userId);
      setUserEmail(userEmail);
      AsyncStorage.setItem('token', token);
      AsyncStorage.setItem('userId', userId);
    } catch (error) {
      Alert.alert('Error', error);
    }
  }

  async function loginHandler({ email, password }) {
    setIsTryingLogin(true);
    try {
      const { token, userId, userEmail } = await login(email, password);
      authenticate(token, userId, userEmail);
      setIsTryingLogin(false);
    } catch (error) {
      Alert.alert(
        'Login failed',
        'Please check the login and password and try again.'
      );
      setIsTryingLogin(false);
    }
  }

  async function signupHandler({ email, password }) {
    setIsTryingLogin(true);
    try {
      const { token, userId, userEmail } = await createUser(email, password);
      authenticate(token, userId, userEmail);
      setIsTryingLogin(false);
    } catch (error) {
      Alert.alert(
        'Authentication failed.',
        'Please check your input and try again later.'
      );
      setIsTryingLogin(false);
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
    isTryingLogin,
    authenticate,
    loginHandler,
    signupHandler,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
