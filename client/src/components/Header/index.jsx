import React from "react";
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrow } from '@fortawesome/free-solid-svg-icons'
import { faBrain} from '@fortawesome/free-solid-svg-icons'
const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
  <header className="text-light py-3" id="header-primary" style={{
  fontFamily: "'Inknut Antiqua', serif"
}}>
      <div className="container d-flex flex-column flex-lg-row justify-content-between align-items-center">
        <div className="text-center text-lg-left mb-3 mb-lg-0">
          <Link className="text-light link" to="/">
            <h1 className="m-0 heading-text">Bird Brain <FontAwesomeIcon icon={faCrow} /><FontAwesomeIcon icon={faBrain} /></h1>
          </Link>
          <p className="m-0 subtitle" style={{
  fontFamily: "'Caveat', cursive"
}}>Sharing is Canar-ing</p>
        </div>
        <div className="text-center text-lg-left">
          {Auth.loggedIn() ? (
            <>
              <span>Hey there, {Auth.getProfile().data.username}!</span>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg m-2" id="login-btn" to="/login">
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
