import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuth, signout } from './helpers';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Xeno
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {isAuth() && (
                <li className="nav-item">
                  <Link className="nav-link" to="/contactlist">
                    contactlist
                  </Link>
                </li>
              )}
            </ul>
            {!isAuth() ? (
              <Fragment>
                <Link
                  to="/signin"
                  className="btn btn-outline-success my-2 mx-4 my-sm-0"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-outline-success my-2 mx-4 my-sm-0"
                >
                  Sign up
                </Link>
              </Fragment>
            ) : (
              <button
                onClick={() => {
                  signout(() => {
                    navigate('/');
                  });
                }}
                className="btn btn-outline-success my-2 mx-4 my-sm-0"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
