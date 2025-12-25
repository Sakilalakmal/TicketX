"use client";
import Link from "next/link";
import useCurrentUser from "../hooks/use-current-user";

function HeaderComponents() {
  const { loading, currentUser, errors } = useCurrentUser();

  // Extract username from email (everything before @)
  const getUsername = (email) => {
    const username = email.split("@")[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          TicketX
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {loading ? (
              <li className="nav-item">
                <span className="nav-link">Loading...</span>
              </li>
            ) : errors ? (
              <li className="nav-item">
                <span className="nav-link text-danger">Error</span>
              </li>
            ) : currentUser ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Welcome, {getUsername(currentUser.email)}
                  </span>
                </li>
                <li className="nav-item">
                  <Link href="/auth/signout" className="nav-link">
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/auth/signin" className="nav-link">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/auth/signup" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponents;
