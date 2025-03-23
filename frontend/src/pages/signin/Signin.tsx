import SignInView from './signin.view';
import { useSignInModel } from './signin.model';

export default function SignIn() {
  const signInModel = useSignInModel();

  return <SignInView {...signInModel} />;
}
