import { NavLink, useNavigate } from "react-router-dom";
import "./Book.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Modal } from "./Modal";

export const Book = ({ curBook }) => {
  const { loggedUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const { key, title, author_name, cover_i, availability } = curBook;
  const formattedTitle = title.replace(/\s+/g, "_");  
  const coverImg = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  const isBorrowed = loggedUser?.borrowedBooks?.some(b => b.key === curBook.key);
  const isAvailable = availability !== false && !isBorrowed;

  const handleClick = () => {
    if (loggedUser) {
      navigate(`/${key.replace(/^\//, "")}/${formattedTitle}`);
    } else {
      setModalMessage('Please LogIn to Continue.');
      setShowModal(true);
    }
  };

  return (
    <li className="hero-container">
      <div className={`main-container ${!isAvailable ? "unavailable" : ""}`}>
        <div className="poster-container">
          <img className="poster" src={coverImg} alt={title} />
          {!isAvailable && <div className="overlay">Out of Stock</div>}
        </div>
        <div className="book-container">
          <div className="book__content">
            <h3 className="book__title">
              {title.length > 20 ? `${title.slice(0, 17)}...` : title}
            </h3>
            <p className="book__author-name">{author_name?.[0] || "Unknown Author"}</p>
            <button className="read_now-btn" onClick={handleClick} disabled={!isAvailable}>
              View
            </button>
          </div>
        </div>
        {showModal && (
          <Modal 
            message={modalMessage} 
            onModalSubmit={() => {
              setShowModal(false);
              if (modalMessage.includes("Please LogIn to Continue.")) {
                navigate("/LoginSignup");
              }
            }} 
          />
        )}
      </div>
    </li>
  );
};