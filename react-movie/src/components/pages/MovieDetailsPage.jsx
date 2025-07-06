import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../../config/config";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );
  //Bảo vệ nếu dữ liệu chưa kịp về
  if (!data) return <div className="text-center text-white">Loading...</div>;
  //Destructure từ data
  const { title, backdrop_path, poster_path, genres,overview} = data;
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
            <span className="px-4 py-2 border rounded-lg border-primary text-primary" key={item.id}>
              {item.name}
            </span>
          ))}
        </div>
        <p className="text-center text-white max-w-[600px] mx-auto pb-10">{overview}</p>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
