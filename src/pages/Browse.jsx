import { useLoaderData } from "react-router-dom";
import {BookRow} from '../components/UI/BookRow'
import '../components/UI/BookRow.css'

export const Browse = () => {
  const genresToDisplay = ["Science", "Comics", "Fiction", "Poetry", "History", "Drama", "Adventure", "Children","classic", "thriller", "Travel", "Philosophy", "Horror" , "Romance","Fantasy"];
  const books = useLoaderData();

  const booksByGenre = genresToDisplay?.reduce((acc, genre) => {
    acc[genre] = books?.filter((book) =>
      book.subjects && book.subjects.some((subject) => subject.toLowerCase().includes(genre.toLowerCase()))
    );
    return acc;
  }, {});

  return (
    <div className="container" style={{ paddingTop: "0px" }}>
      <div className="book-rows">
        {genresToDisplay && genresToDisplay.map((genre) => (<BookRow key={genre} genre={genre} books={booksByGenre[genre] || []} />))}
      </div>

    </div>
  );
};