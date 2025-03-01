import UserSectionView from './userSection.view';
import GuestSectionView from './guestSection.view';
import { useHomeModel } from './home.model';

export default function Home() {
  const { isLoggedIn, ...rest } = useHomeModel();

  return (
    <div>
      <header>
        <a href="/auth/signin">Sign In</a>
        <br />
        <a href="/auth/signup">Sign Up</a>
      </header>
      <>{isLoggedIn ? <UserSectionView {...rest} /> : <GuestSectionView />}</>
    </div>
  );
}
