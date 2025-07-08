import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import { apiKey, fetcher, tmdbAPI } from "../../config/config";
import MovieCard from "../movie/MovieCard";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  //Bảo vệ nếu dữ liệu chưa kịp về
  if (!data) return <div className="text-center text-white">Loading...</div>;
  //Destructure từ data
  const { title, backdrop_path, poster_path, genres, overview } = data;
  return (
    <div>
      <div className="w-full h-[600px] relative ">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
        <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[250px] relative z-10 pb-10">
          <img
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            className="object-cover w-full h-full rounded-xl"
            alt=""
          />
        </div>
        <h1 className="mb-10 text-3xl font-bold text-center text-white ">
          {title}
        </h1>
        <div className="flex items-center justify-center mb-10 text-white gap-x-5">
          {genres.map((item) => (
            <span
              className="px-4 py-2 border rounded-lg border-primary text-primary"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
        <p className="text-center text-white max-w-[600px] mx-auto pb-10">
          {overview}
        </p>
        <MovieCredits></MovieCredits>
        <MovieVideo></MovieVideo>
        <MovieSimilar></MovieSimilar>
      </div>
    </div>
  );
};
//https://api.themoviedb.org/3/movie/${movieId}/credits?
function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId,"credits"), fetcher);
  if (!data) return null;
  console.log(data);
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <>
      <h2 className="mb-10 text-3xl text-center text-white">Casts</h2>
      <div className="grid grid-cols-4 gap-5 ]">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              alt=""
              className="w-full h-[350px] object-cover rounde-lg mb-3"
            />
            <h3 className="text-2xl font-thin text-white">{item.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
function MovieVideo() {
  const { movieId } = useParams();
  const { data } = useSWR(
    tmdbAPI.getMovieMeta(movieId,"videos"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      {results.slice(0, 5).map((item) => (
        <div key={item.id} className="w-full aspect-video ">
          <iframe
            width="704"
            height="396"
            src={`https://www.youtube.com/embed/${item.key}`}
            title="Nhánh 2-0 &amp; 0-2 | Tấm vé cuối của STV, NK quyết tiến đến Knockout | FVPL Summer 2025 SWISS Stage 6/7"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            className="object-fill w-full h-full p-5"
          ></iframe>
        </div>
      ))}
    </div>
  );
}
function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
   tmdbAPI.getMovieMeta(movieId,"similar"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="mb-10 text-3xl font-medium text-white">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
