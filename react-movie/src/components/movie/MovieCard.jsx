import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbAPI } from "../../config/config";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none bg-slate-800">
      <img
        src={tmdbAPI.image500(poster_path)}
        alt={title}
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />

      {/* Nội dung bên trong: tiêu đề, năm, rating, nút */}
      <div className="flex flex-col flex-1">
        {/* Tiêu đề */}
        <h3 className="mb-3 text-xl font-bold line-clamp-2 min-h-[56px]">
          {title}
        </h3>

        {/* Thông tin và nút */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-5 font-mono text-sm text-white text-opacity-50">
            <span>{release_date ? new Date(release_date).getFullYear() : "N/A"}</span>
            <span>{vote_average?.toFixed(1) || "0.0"}</span>
          </div>

          <Button bgColor="secondary" onClick={()=>navigate(`/movies/${id}`)}>Watch now</Button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
