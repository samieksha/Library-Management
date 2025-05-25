import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
      <footer className="section-footer">
        <div className="footer-container container">
          <div className="content_1">
            <p>
            Explore a world of knowledge. <br/>Lectura offers instant access to thousands of books, 
            from timeless classics to the latest releases.
            </p>
          </div>
          <div className="content_2">
            <h4>EXPERIENCE</h4>
            <NavLink to="/about" >Our Vision</NavLink>
            <NavLink to="/contact" >Contact Us</NavLink>
            <NavLink to="/about" >Our Customers</NavLink>
          </div>
          <div className="content_3"></div>
        </div>
      </footer>
    );
  };