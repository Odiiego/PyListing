import { useSignUpModel } from './signup.model';
import SignUpView from './signup.view';

export default function SignUp() {
  const signUpModel = useSignUpModel();

  return <SignUpView {...signUpModel} />;
}
