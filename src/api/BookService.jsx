import { getBooksData } from "./GetBooksAPIData";

const genresToDisplay = ["Science", "Philosophy", "Drama", "Fiction", "History"];

export const getBooksGroupedByGenre = async () => {
  const allBooks = await getBooksData();
  if (!allBooks) return {};

  const grouped = {};

  genresToDisplay.forEach((genre) => {
    grouped[genre] = allBooks.filter((book) =>
      book.subjects?.includes(genre) ||
      book.subjects?.includes(genre.toLowerCase())
    ).slice(0, 10); // Limit to 10 books per category (optional)
  });

  return grouped;
};
