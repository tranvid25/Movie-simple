import React from "react";

const MovieCard = () => {
  return (
    <div className="p-3 text-white rounded-lg movie-card bg-slate-800">
      <img
        src="https://tse3.mm.bing.net/th/id/OIP.mzwYTqDkEmU6QKX3MMhPyAHaEK?pid=Api&P=0&h=180"
        alt=""
        className="w-full h-[250px] object-center rounded-lg mb-5"
      />
      <h3 className="mb-3 text-xl font-bold">Spiderman: Homecomming</h3>
      <div className="flex items-center justify-between mb-10 text-sm text-opacity-50">
        <span>2017</span>
        <span>7.4</span>
      </div>
      <button className="w-full p-5 text-xl font-semibold bg-pink-400 rounded-lg">
        Watch Now
      </button>
    </div>
  );
};

export default MovieCard;
