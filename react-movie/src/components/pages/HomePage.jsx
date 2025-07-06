import React, { Fragment } from "react";
import MovieList from "../movie/MovieList";
import MovieRated from "../movie/MovieRated";
import MovieTrending from "../movie/MovieTrending";


const HomePage = () => {
  return (
    <Fragment>
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
};

export default HomePage;
