<<<<<<< HEAD
import { Link} from 'react-router-dom';
import Auth from '../../utils/auth';

=======
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

>>>>>>> 4ad27192f20745a2f74c847321937280f8da15c8
const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Bird Brain</h1>
          </Link>
<<<<<<< HEAD
          <p className="m-0">Find Your Birds</p>
=======
          <p className="m-0">Bird Text</p>
>>>>>>> 4ad27192f20745a2f74c847321937280f8da15c8
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <span>Hey there, {Auth.getProfile().data.username}!</span>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
