import React, { useContext, useState } from 'react';
import { getLoggedInUser, getUsers, saveUsers } from '../api/userService';
import { NavLink } from 'react-router-dom';
import './UserProfile.css';  // Import the CSS file
import { UserContext } from '../context/UserContext';

const UserProfile = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  if (!loggedUser) {
    return <p className="loading-msg">Loading user profile...</p>;
  }
  const username = loggedUser.email.split('@')[0];
  const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

  const returnBook = (bookKey) => {
    const updatedUser = {
      ...loggedUser,
      borrowedBooks: loggedUser.borrowedBooks.filter(book => book.key !== bookKey),
    };

    const users = getUsers().map(u =>
      u.email === updatedUser.email ? updatedUser : u
    );
    saveUsers(users);
    setLoggedUser(updatedUser);
  };

  return (
    <div className="user-profile">
      <h2 className="welcome-msg">Welcome, {capitalizedUsername}!</h2>

      <section className="borrowed-books">
        <h3>Your Borrowed Books</h3>
        {loggedUser.borrowedBooks.length === 0 ? (
          <p className="no-books">You have no books borrowed.</p>
        ) : (
          <ul className="book-list">
            {loggedUser.borrowedBooks.map(book => (
              <li key={book.key} className="book-item">
                <div className="book-info">
                  <strong>{book.title}</strong>
                  </div>
                  <button className="return-btn" onClick={() => returnBook(book.key)}>Return</button>
                  </li>
                ))}
          </ul>
        )}

        {loggedUser.borrowedBooks.length < 2 && (
          <p className="borrow-link">
            <NavLink to="/browse">Borrow a Book</NavLink>
          </p>
        )}
      </section>

      <hr className="divider" />

      <p className="view-all-link">
        <NavLink to="/browse">Explore All Books</NavLink>
      </p>
    </div>
  );
};

export default UserProfile;