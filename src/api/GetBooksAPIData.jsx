// Summary: Fetches the data from the API. 
//          Appends subjects and availability property to the fetched data and returns it.

export const getBooksData = async () => {
  // Utility to try fetching from a query
  const tryFetch = async (query) => {
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}&page=1&limit=50`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  };

  try {
    let data;

    // Try fetching with "the", fallback to "harry"
    try {
      data = await tryFetch("the");
    } catch (primaryError) {
      console.warn("Primary query failed, using fallback query: harry");
      data = await tryFetch("harry");
    }

    // Enrich books with subjects and availability
    const detailedBooks = await Promise.all(
      data?.docs.map(async (book) => {
        if (!book.key) return book;

        try {
          const workResponse = await fetch(`https://openlibrary.org${book.key}.json`);
          if (!workResponse.ok) throw new Error("Work fetch failed");

          const workData = await workResponse.json();
          const subjects = workData.subjects || [];
          const availability = !subjects.some((subject) =>
            subject.toLowerCase().includes("drama")
          );

          return {
            ...book,
            subjects,
            availability,
          };
        } catch (workError) {
          // Fallback if book work data fails
          return {
            ...book,
            subjects: [],
            availability: true,
          };
        }
      })
    );

    return detailedBooks;
  } catch (error) {
    console.error("Error fetching books data:", error);
    return null;
  }
};


















// //Summary: Fetches the data from the API. 
// //         Appends  subjects and availability property to the fetched data and returns it.
// export const getBooksData = async () => {
//   try {
//     const response = await fetch(
//       `https://openlibrary.org/search.json?q=the&page=1&limit=50`
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();

//     // Map through search results and fetch detailed work data for each book
//     const detailedBooks = await Promise.all(
//       data?.docs.map(async (book) => {
//         if (!book.key) return book;

//         // Fetch each book details
//         try {
//           const workResponse = await fetch(`https://openlibrary.org${book.key}.json`);
//           if (!workResponse.ok) throw new Error('Work fetch failed');
//           const workData = await workResponse.json();
//           console.log("workData: ",workData);
//           //console.log("edition_count: ",book.edition_count);

//           // Extract genre
//           const subjects = workData.subjects || [];

//           // Determine availability based on "drama" subject
//           const availability = !subjects.some((subject) =>
//             subject.toLowerCase().includes("drama")
//           );

//           return {
//             ...book,
//             subjects,
//             availability,
//           };
//         } 
//         catch {
//           // If error in fetching work data, return original book without subjects/availability
//           return {
//             ...book,
//             subjects: [],
//             availability: true,
//           };
//         }
//       })
//     );

//     return detailedBooks;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
