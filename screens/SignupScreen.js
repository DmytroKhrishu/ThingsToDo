import { useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const authCtx = useContext(AuthContext);

  if (authCtx.isTryingLogin) {
    return <LoadingOverlay message="Signing up..." />;
  }

  return <AuthContent onAuthenticate={authCtx.signupHandler} />;
}

export default SignupScreen;
