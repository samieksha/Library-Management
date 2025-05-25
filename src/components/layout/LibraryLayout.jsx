import { Outlet, useNavigation } from "react-router-dom";
import {Footer} from "./Footer";
import Header from "./Header";

const LibraryLayout = () => {
  return (
  <>
  <Header />
  <Outlet />
  <Footer />
  </>
  );
};

export default LibraryLayout;