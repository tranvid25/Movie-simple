import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config/config";
import MovieCard from "../movie/MovieCard";
import useDebounce from "../../hooks/useDebounce";

const MoviePage = () => {
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 2000); // 1 giây debounce
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/movie/popular?api_key=bd4a994d57d4e648fd2a696735ed063f"
  );
  // URL động phụ thuộc vào từ khóa

  const { data, isLoading } = useSWR(url, fetcher);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=bd4a994d57d4e648fd2a696735ed063f&query=${filterDebounce}`
      );
    } else {
      setUrl(
        "https://api.themoviedb.org/3/movie/popular?api_key=bd4a994d57d4e648fd2a696735ed063f"
      );
    }
  }, [filterDebounce]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const movies = data?.results || [];
  

  return (
    <div className="py-10 page-container">
      <div className="flex mb-5">
        <div className="flex-1 pr-3">
          <input
            type="text"
            className="w-full p-4 text-white outline-none bg-slate-800"
            placeholder="Type here to search ..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 text-white bg-pink-600 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      {/* Loading state */}
      {isLoading && <p className="text-white">Loading...</p>}

      {/* Hiển thị danh sách phim */}
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>

      {/* Nếu không có kết quả */}
      {!isLoading && movies.length === 0 && (
        <p className="text-white">No movies found.</p>
      )}
    </div>
  );
};

export default MoviePage;
