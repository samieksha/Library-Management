import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LibraryLayout from './components/layout/LibraryLayout'
import { ErrorPage } from './pages/ErrorPage'
import Home from './pages/Home'
import { About } from './pages/about'
import { Contact, contactData } from './pages/contact'
import { Browse } from './pages/Browse'
import { BookDetails } from './components/UI/BookDetails'
import { getBooksData } from './api/GetBooksAPIData'
import { getBookDetails } from './api/GetBookDetails'
import { LoginSignup } from './components/LoginSignUp/LoginSignUp'
import { ChangePassword } from './components/LoginSignUp/ChangePassword'
import  UserProfile  from './pages/UserProfile'
import { getBooksGroupedByGenre } from './api/BookService'

const App = () => {
  const router = createBrowserRouter(
    [{path:"/",
      element: <LibraryLayout/>,
      errorElement: <ErrorPage />,
      children : [
        {
          path: "/",
          element:<Home/>,
          loader: getBooksGroupedByGenre,
        },
        {
          path: "/LoginSignup",
          element:<LoginSignup/>
        },
        {
          path: "/LoginSignup/ChangePassword",
          element:<ChangePassword/>
        },
        { path:"/UserProfile",
          element:<UserProfile />
        },
        {
          path: "/About",
          element: <About />,
        },
        {
          path: "/Browse",
          element: <Browse />,
          loader: getBooksData,
        },
        {
          path: "works/:workID/:title",
          element: <BookDetails />,
          loader: getBookDetails,
        },
        {
          path: "/Contact",
          element: <Contact />,
          action: contactData,
        },
      ],
    },
  ]);
   return <RouterProvider router = {router} />;
}
export default App
