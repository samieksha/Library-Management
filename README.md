# Project Structure
src/
├── api/
│ └── userService.jsx
│ └── GetBookDetails.jsx
│ └── GetBooksAPIData.jsx
├── components/
│ ├── LoginSignUp/
│ │ ├── LoginSignup.jsx
│ │ ├── LoginSignup.css
│ │ └── ChangePassword.jsx
│ ├── Book/
│ │ ├── BookList.jsx
│ │ └── BookDetails.jsx
│ │ └── BookDetails.css
│ └── UI/
│ └── Modal.jsx
│ └── Book.css
│ └── Book.jsx
│ └── BookRow.css
│ └── BookRow.jsx
│ └── Layout/
│ └── AuthNavItem.css
│ └── AuthNavItem.jsx
│ └── Footer.jsx
│ └── Header.jsx
│ └── LibraryLayout.jsx
├── context/
│ └── UserContext.jsx
├── pages/
│ └── Browse.jsx
│ └── Contact.jsx
│ └── ErrorPage.jsx
│ └── Home.jsx
│ └── UserProfile.css
│ └── UserProfile.jsx
│ └── about.jsx
├── App.jsx
├── index.css
├── App.css
├── main.jsx

# User Flow
Login or Sign Up
- Users can register with an email and password.
- Existing users can log in with credentials.
- Feedback is given via modals for invalid attempts or successful actions.

Change Password
- Users can reset their password by entering their registered email.
- Only works for valid users and if the passwords match.

Browse Books
- Books are fetched from Open Library API and grouped into genres: Science, Philosophy, Drama, Fiction, and History.
- Each genre displays up to 10 books.
- Availability is determined by the absence of "drama" in the subject list.

Book Details
- Clicking a book opens a detailed view including:
  Title
  Author
  Description
  Publish year
  Subjects
  Language
  Borrow button (if available)

Borrow and Return Books
- Users can borrow up to 2 books at a time.
- Borrowed books appear in the UserProfile page with return functionality.

Data Storage
- All user data is stored in browser localStorage.
- Users key holds array of user objects: { email, password, borrowedBooks }
- loggedInUser key holds the current session user
- No backend or database integration

# Usage
- Install dependencies
  npm install
- Run the development server
  npm run dev
- Visit the app
  http://localhost:5173

# Important Notes
Passwords are stored in plain text (for demonstration purposes only)
API data may be inconsistent depending on the Open Library endpoint availability
No backend, so data loss may occur if localStorage is cleared


# Detailed File Descriptions

api/
- GetBookDetails.jsx: Contains functions to fetch detailed information about a specific book, including author details, from the Open Library API.
- GetBooksAPIData.jsx: Fetches a list of books from the Open Library API, enriches them with subjects and availability status, and groups them by predefined genres.
- userService.jsx: Manages user data using localStorage, providing functions to get, save, and remove users, as well as handle login sessions.

components/

LoginSignUp/
- ChangePassword.jsx: Allows users to reset their password by entering their registered email and new password. Validates user existence and password match before updating.
- LoginSignup.jsx and LoginSignup.css: Provides a combined login and signup form. Handles user authentication, registration, and displays appropriate feedback messages using modals.
  
Book/
- BookDetails.jsx: Displays detailed information about a selected book, including title, author, description, publish year, subjects, language, and availability.
- BookList.jsx: Renders a list of books grouped by genre, utilizing the BookRow component for each genre.

UI/
- Modal.jsx: A reusable modal component used to display messages and confirmations throughout the application.
- BookRow.jsx and BookRow.css: A reusable component that displays a horizontal row of books for a specific genre, allowing users to scroll through available titles.
- Book.jsx and Book.css: A reusable component that defines the Book component, which displays individual book information in a styled card format.
  
Layout/
- AuthNavItem.jsx and AuthNavItem.css: Defines navigation items that change based on user authentication status.
- Footer.jsx: Renders the footer section of the application.
- Header.jsx: Displays the header, including the application title and navigation links.
- LibraryLayout.jsx: Provides a consistent layout structure for the application pages, including header and footer.

context/
- UserContext.jsx: Creates a React context to manage and provide user authentication state across the application.

pages/
- Browse.jsx: Displays the main browsing interface, showing books grouped by genre.
- Contact.jsx: Provides a contact form or information for users to reach out.
- ErrorPage.jsx: Displays an error message for undefined routes or application errors.
- Home.jsx: Serves as the landing page, introducing users to the application.
- UserProfile.jsx and UserProfile.css: Displays the user's profile information, including borrowed books and options to return them.
- about.jsx: Provides information about the application, its purpose, and creators.

App.jsx: The root component that sets up routing and integrates all parts of the application.

App.css and index.css: Contain global styles for the application.

main.jsx: The entry point of the React application, rendering the App component into the DOM.

# User Flow

Login or Sign Up
- Users can register with an email and password.
- Existing users can log in with their credentials.
- Feedback is provided via modals for invalid attempts or successful actions.

Change Password
- Users can reset their password by entering their registered email.
- Password reset is allowed only for existing users and if the new passwords match.

Browse Books
- Books are fetched from the Open Library API and grouped into genres: Science, Philosophy, Drama, Fiction, and History.
- Each genre displays up to 10 books.
- Availability is determined by the absence of "drama" in the subject list.

Book Details
- Clicking on a book opens a detailed view including:
- Title
- Author
- Description
- Publish year
- Total copies of books
- Copies left after booking
- Borrow button

Borrow and Return Books
- Users can borrow up to 2 books at a time.
- Borrowed books appear in the UserProfile page with an option to return them.

Data Storage
- All user data is stored in the browser's localStorage.
- The "users" key holds an array of user objects: { email, password, borrowedBooks }.
- The "loggedInUser" key holds the current session user.
- There is no backend or database integration.
