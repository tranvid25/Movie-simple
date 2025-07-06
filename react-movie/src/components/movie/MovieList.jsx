import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher } from "../../config/config";
//https://api.themoviedb.org/3/movie/now_playing?api_key=
const MovieList = ({type="now_playing"}) => {
  const { data} = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=bd4a994d57d4e648fd2a696735ed063f`,
    fetcher
  );
  
  const [movie, setMovie] = useState([]);
  useEffect(() => {
     if (data && data.results) setMovie(data.results);
  }, [data]);
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movie.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
