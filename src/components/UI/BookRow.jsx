import { Book } from "./Book";
import "./BookRow.css";

export const BookRow = ({ genre, books }) => {
  return (
    <div className="book-row">
      <h2 className="genre-title">{genre.toUpperCase()}</h2>
      <div className="book-scroll-container">
        {books.map((book) => (
          <Book key={book.key} curBook={book} />
        ))}
      </div>
    </div>
  );
};
