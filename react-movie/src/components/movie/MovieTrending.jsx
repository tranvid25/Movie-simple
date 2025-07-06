import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher } from "../../config/config";
import MovieCartTrending from "./MovieCartTrending";
const MovieTrending = () => {
  const { data, error } = useSWR(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=bd4a994d57d4e648fd2a696735ed063f",
    fetcher
  );
  console.log(data);
  const [movieTrend, setMovieTrend] = useState([]);
  useEffect(() => {
    if (data && data.results) setMovieTrend(data.results);
  }, [data]);

  return <div className="movie-list">
    <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
         {movieTrend.length > 0 &&
          movieTrend.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCartTrending item={item}></MovieCartTrending>
            </SwiperSlide>
          ))}
    </Swiper>
  </div>;
};

export default MovieTrending;
