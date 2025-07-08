import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config/config";
import MovieCard from "../movie/MovieCard";
import useDebounce from "../../hooks/useDebounce";
import ReactPaginate from "react-paginate";

const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 2000);

  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=bd4a994d57d4e648fd2a696735ed063f&page=1`
  );

  const { data, isLoading } = useSWR(url, fetcher);

  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=bd4a994d57d4e648fd2a696735ed063f&query=${filterDebounce}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=bd4a994d57d4e648fd2a696735ed063f&page=${nextPage}`
      );
    }
  }, [filterDebounce, nextPage]);

  useEffect(() => {
    if (data && data.total_pages) {
      setPageCount(data.total_pages);
    }
  }, [data]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handlePageClick = (event) => {
    setNextPage(event.selected + 1); // Vì selected bắt đầu từ 0
  };

  const movies = data?.results || [];

  return (
    <div className="py-10 page-container">
      {/* Search Input */}
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

      {/* Loading */}
      {isLoading && <p className="text-white">Loading...</p>}

      {/* Movie Grid */}
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>

      {/* No results */}
      {!isLoading && movies.length === 0 && (
        <p className="text-white">No movies found.</p>
      )}

      {/* ReactPaginate */}
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center gap-2 text-white"
          pageClassName="px-3 py-1 border border-slate-500 rounded hover:bg-slate-700"
          activeClassName="bg-pink-600 text-white"
          previousClassName="px-3 py-1 border border-slate-500 rounded hover:bg-slate-700"
          nextClassName="px-3 py-1 border border-slate-500 rounded hover:bg-slate-700"
        />
      </div>

      {/* Manual Prev/Next */}
      {/* <div className="flex items-center justify-center gap-4 pt-5">
        <span
          className="text-white cursor-pointer"
          onClick={() => setNextPage((prev) => Math.max(prev - 1, 1))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span className="inline-block px-4 py-2 leading-none bg-white rounded text-slate-900">
          {nextPage}
        </span>
        <span
          className="text-white cursor-pointer"
          onClick={() =>
            setNextPage((prev) => (prev + 1 <= pageCount ? prev + 1 : prev))
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div> */}
    </div>
  );
};

export default MoviePage;
