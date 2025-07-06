import React from "react";

const MovieCardRated = ({ item }) => {
  const { title, vote_average, release_date, poster_path } = item;
  return (
    <div className="p-3 text-white rounded-lg movie-card bg-slate-800">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <div className="flex items-center justify-between mb-10 text-sm text-opacity-50">
        <span>{new Date(release_date).getFullYear()}</span>
        <span>{vote_average}</span>
      </div>
      <button className="w-full p-5 text-xl font-semibold bg-pink-400 rounded-lg">
        Watch Now
      </button>
    </div>
  );
};

export default MovieCardRated;
