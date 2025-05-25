import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import "./AuthNavItem.css";
import { logoutUser } from "../../api/userService";

const AuthNavItem = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedUser(null);
    logoutUser();
    setIsOpen(false);
    navigate("/");
  };

  if (!loggedUser) {
    return (
      <li className="nav-item">
        <NavLink
          to="/LoginSignup"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Login
        </NavLink>
      </li>
    );
  }

  return (
    <li className="nav-item auth-nav">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-link auth-nav-button"
      >
        <FaUserCircle size={35} title="UserProfile" />
      </button>

      {isOpen && (
        <ul className="accordion-menu">
          <li>
            <NavLink to="/UserProfile" className="nav-link" onClick={() => setIsOpen(false)}>
              Profile
            </NavLink>
          </li>
          <li >
            <button type="button" className="nav-link logout" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
    </li>
  );
};

export default AuthNavItem;
