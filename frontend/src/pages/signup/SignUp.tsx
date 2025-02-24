import { useSignUpModel } from './signup.model';
import SignUpView from './signup.view';

export default function SignUp() {
  const methods = useSignUpModel();

  return <SignUpView {...methods} />;
}
