import { Fragment } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import MovieList from "./components/movie/MovieList";
import MovieRated from "./components/movie/MovieRated";
import MovieTrending from "./components/movie/MovieTrending";
import Banner from "./components/banner/Banner";
function App() {
  return (
    <Fragment>
      <header className="flex items-start justify-center py-10 mb-10 text-white header gap-x-5">
        <span className="text-primary">Home</span>
        <span>Movie</span>
      </header>
       <Banner></Banner>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Now playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Top Rated
        </h2>
       <MovieRated></MovieRated>
      </section>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Trending
        </h2>
        <MovieTrending></MovieTrending>
      </section>
    </Fragment>
  );
}

export default App;
