import UserSectionView from './userSection.view';
import GuestSectionView from './guestSection.view';
import { useHomeModel } from './home.model';
import { logout } from '../../services/auth/authServices';

export default function Home() {
  const { isLoggedIn, ...rest } = useHomeModel();

  return (
    <div>
      <header>
        <>
          {isLoggedIn ? (
            <a onClick={logout} href="/">
              logout
            </a>
          ) : (
            <a className="m-4" href="/auth/signin">
              Sign In
            </a>
          )}
        </>
      </header>
      <>{isLoggedIn ? <UserSectionView {...rest} /> : <GuestSectionView />}</>
    </div>
  );
}
