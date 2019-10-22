import React, { Suspense } from "react";
import Spinner from "../commons/spinner/Spinner";
import Navbar from "./navbar/NavBar";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import { SET_FAB_CHAR, SET_DEFAULT_FILTERS } from "./redux/types";

//* if there are items in the favorites array. Set favorites to initial state
if (localStorage.favorites) {
  store.dispatch({
    type: SET_FAB_CHAR,
    payload: JSON.parse(localStorage.favorites)
  });
}

//* If preferences are not set, set the default preferences at the first page load.
if (!localStorage.preferences) {
  //* Default Preferences [charactersFilter:boolean, formatType:str, displayBy:str, orderBy:bool] */
  const preferences = [false, "comic", "title", true];
  localStorage.setItem("preferences", JSON.stringify(preferences));

  store.dispatch({
    type: SET_DEFAULT_FILTERS,
    payload: JSON.parse(localStorage.preferences)
  });
} else {
  store.dispatch({
    type: SET_DEFAULT_FILTERS,
    payload: JSON.parse(localStorage.preferences)
  });
}

const Layout = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <div id="main" className="container-fluid">
        <Suspense fallback={Spinner}>{children}</Suspense>
      </div>
      <Footer />
    </BrowserRouter>
  </Provider>
);

export default Layout;
