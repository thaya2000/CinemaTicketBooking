import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { AcmeLogo } from "./AcmeLogo.jsx";
import "./Menu.css";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

export default function Menu() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const dashboard = () => {
    if (auth?.user?.role === 1) {
      navigate("/dashboard/admin");
    } else {
      navigate("/dashboard/user");
    }
  };

  return (
    /*
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Movie Ticket Booking
          </a>

          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/now-showing">
                Now Showing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/coming-soon">
                Coming Soon
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/booking">
                Booking
              </NavLink>
            </li>
          </ul>

          <ul class="navbar-nav me-2 mb-2 mb-lg-0">
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
      </nav>
    </>
    */

    <>
      <Navbar>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Regal Cinema</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <NavLink color="foreground" aria-current="page" to="/">
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/now-showing" color="secondary">
              Now Showing
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink color="foreground" to="/coming-soon">
              Coming Soon
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink color="foreground" to="/booking">
              Booking
            </NavLink>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          {!auth?.user ? (
            <>
              <NavbarItem>
                <NavLink to="/login" aria-current="page" color="secondary">
                  Sign In
                </NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink color="foreground" to="/register">
                  Sign Up
                </NavLink>
              </NavbarItem>
            </>
          ) : (
            <>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{auth?.user?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="dashboard" onClick={dashboard}>
                    Dashboard
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={logout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}
