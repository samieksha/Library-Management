import { NavLink } from "react-router-dom";
import AuthNavItem from "./AuthNavItem";

const Header = () => {
    return (
        <>
          <header className="section-navbar">
            <section className="top_txt">
              <div className="head container"></div>
            </section>
    
            <div className="container">
              <div className="navbar-brand">
                <NavLink to="/">
                  <h3>Lectura</h3>
                </NavLink>
              </div>
    
              <nav className="navbar">
                <ul>
                  <li className="nav-item">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/about"
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "nav-link active" : "nav-link",
                        };
                      }}
                    >
                      about
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="browse"
                      className="nav-link"
                    >
                      Browse
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="contact"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }>
                      contact
                    </NavLink>
                  </li>
                  <AuthNavItem />
                </ul>
              </nav>
            </div>
          </header>
        </>
      );
    
}
export default Header;