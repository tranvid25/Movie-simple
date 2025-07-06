import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher } from "../../config/config";
import MovieCardRated from "./MovieCardRated";
const MovieRated = () => {
  const { data, error } = useSWR(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=bd4a994d57d4e648fd2a696735ed063f",
    fetcher
  );
  
  const [movieRate, setMovieRate] = useState([]);
  useEffect(() => {
    if (data && data.results) setMovieRate(data.results);
  }, [data]);
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movieRate.length > 0 &&
          movieRate.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCardRated item={item}></MovieCardRated>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieRated;
