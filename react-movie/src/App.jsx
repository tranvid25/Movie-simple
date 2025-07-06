import { Fragment } from "react/jsx-runtime";

import Banner from "./components/banner/Banner";

import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import HomePage from "./components/pages/HomePage";
import MoviePage from "./components/pages/MoviePage";
import MovieDetailsPage from "./components/pages/MovieDetailsPage";
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
    </Fragment>
  );
}

export default App;
