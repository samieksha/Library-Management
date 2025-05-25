export const getBookDetails = async ({ params }) => {
  const { workID } = params;

  try {
    const res = await fetch(`https://openlibrary.org/works/${workID}.json`);
    const book = await res.json();

    // Get author
    const authorKey = book.authors?.[0]?.author?.key;
    let authorName = "Unknown Author";
    if (authorKey) {
      const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
      const authorData = await authorRes.json();
      authorName = authorData.name;
    }

    return {
      ...book,
      author_name: authorName,
    };
  } catch (err) {
    console.error("Error fetching book details:", err);
    return null;
  }
};
