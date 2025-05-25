import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./BookDetails.css";

export const BookDetails = () => {
  const book = useLoaderData();
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [isBorrowed, setIsBorrowed] = useState(false);
  const {title, author_name, first_publish_date, description, covers, revision } = book;
  const totalCopies = (book.revision - 11) || 1;
  const [availableCopies, setAvailableCopies] = useState(totalCopies);

  const coverImg = covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  useEffect(() => {
    if (loggedUser?.borrowedBooks) {
      const borrowed = loggedUser.borrowedBooks.some((b) => b.key === book.key);
      setIsBorrowed(borrowed);
      // If user already borrowed this book, reduce availableCopies by 1
      if (borrowed) {setAvailableCopies(totalCopies - 1);
      } else {setAvailableCopies(totalCopies);
      }
    }
    }, [loggedUser, book.key, totalCopies]);

  const handleBorrow = () => {
    if (!loggedUser) {
      navigate("/LoginSignup");
      return;
    }
    if (isBorrowed || loggedUser.borrowedBooks.length >= 2) return;
    const updatedUser = {
      ...loggedUser,
      borrowedBooks: [...loggedUser.borrowedBooks, { key: book.key, title }]
    };
    setLoggedUser(updatedUser);
    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
    // Decrease available copies locally
    setAvailableCopies(prev => prev - 1);
    setIsBorrowed(true);
  };

  return (
    <div className="book-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <div className="book-details-card">
        <img src={coverImg} alt={title} className="book-details-cover" />
        <div className="book-details-info">
          <h1 className="book-title">{title}</h1>
          <p className="book-author">
            Author(s): {author_name? author_name: "Unknown Author"}
          </p>
          <p className="book-publish">First Published: {first_publish_date || "Unknown"}
          </p>
          {description && (
            <p className="book-description">
              {typeof description === "string" ? description : description.value}
            </p>
          )}
          <p className="copies-info">
            Total copies: <b>{totalCopies}</b><br />
            Copies left: <b>{availableCopies > 0 ? availableCopies : "None left"}</b>
          </p>
          <button 
            className="borrow-button" 
            onClick={handleBorrow}
            disabled={isBorrowed || loggedUser?.borrowedBooks?.length >= 2}
          >
            {isBorrowed ? "Already Borrowed" : "+ Add to Borrowed"}
          </button>
        </div>
      </div>
    </div>
  );
};