import { SignInView } from './signin.view';
import { useSignInModel } from './signin.model';

export default function Signin() {
  const methods = useSignInModel();

  return <SignInView {...methods} />;
}
