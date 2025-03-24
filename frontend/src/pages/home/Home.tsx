import UserSectionView from './userSection.view';
import GuestSectionView from './guestSection.view';
import { useHomeModel } from './home.model';
import { Link } from 'react-router-dom';

export default function Home() {
  const { isLoggedIn, handleLogout, ...rest } = useHomeModel();

  return (
    <div>
      <header className="flex justify-between p-4 bg-gray-200 shadow-md">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Link className="text-blue-600 hover:underline" to="/auth/signin">
            Sign In
          </Link>
        )}
      </header>

      {isLoggedIn ? <UserSectionView {...rest} /> : <GuestSectionView />}
    </div>
  );
}
