import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCartTrending = ({ item }) => {
  const navigate = useNavigate();
  const { title, vote_average, release_date, poster_path,id } = item;
  return (
    <div className="p-3 text-white rounded-lg movie-card bg-slate-800">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold line-clamp-2">{title}</h3>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-5 font-mono text-sm text-opacity-50">
            <span>{new Date(release_date).getFullYear()}</span>
            <span>{vote_average.toFixed(1)}</span>
          </div>

          <button
            onClick={() => navigate(`/movies/${id}`)}
            className="w-full px-6 py-3 font-bold capitalize rounded-lg bg-primary"
          >
            Watch now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCartTrending;
