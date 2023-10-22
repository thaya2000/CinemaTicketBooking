import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        {/* <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Movie Ticket Booking
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink className="nav-link" to="/now-showing">
                      Now Showing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/coming-soon">
                      Coming Soon
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/booking">
                      Booking
                    </NavLink>
                  </li>
                  <div className="dropdown">
                    <li>
                      <a
                        className="nav-link pointer dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        {auth?.user?.name?.toUpperCase()}
                      </a>

                      <ul className="dropdown-menu pointer">
                        <li className="drop-item">
                          <NavLink
                            className="nav-link"
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          >
                            Dashboard
                          </NavLink>
                        </li>

                        <li className="drop-item pointer">
                          <a onClick={logout} className="nav-link">
                            Logout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div> */}

        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          {!auth?.user ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="nav-link" to="/now-showing">
                  Now Showing
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/coming-soon">
                  Coming Soon
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/booking">
                  Booking
                </NavLink>
              </li>
              <div className="dropdown">
                <li>
                  <a
                    className="nav-link pointer dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    {auth?.user?.name?.toUpperCase()}
                  </a>

                  <ul className="dropdown-menu pointer">
                    <li className="drop-item">
                      <NavLink
                        className="nav-link"
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>

                    <li className="drop-item pointer">
                      <a onClick={logout} className="nav-link">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </div>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
