import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const {token, userId} = await createUser(email, password);
      authCtx.authenticate(token, userId);
    } catch (error) {
      Alert.alert(
        'Authentication failed.',
        'Please check your input and try again later.'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Signing up..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;