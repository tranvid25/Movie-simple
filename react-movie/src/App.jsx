import { Fragment } from "react/jsx-runtime";

import Banner from "./components/banner/Banner";

import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import HomePage from "./components/pages/HomePage";
import MoviePage from "./components/pages/MoviePage";
import MovieDetailsPage from "./components/pages/MovieDetailsPage";
import FirebaseApp from "./firebase/FirebaseApp";
import Firebase_Auth from "./firebase/Firebase_Auth";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <Banner></Banner>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailsPage></MovieDetailsPage>}></Route>
        </Route>
      </Routes>
      <Firebase_Auth></Firebase_Auth>
    </Fragment>
  );
}

export default App;
