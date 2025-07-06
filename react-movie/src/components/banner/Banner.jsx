import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config/config";
import { SwiperSlide, Swiper } from "swiper/react";

const Banner = () => {
  const { data } = useSWR(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=bd4a994d57d4e648fd2a696735ed063f",
    fetcher
  );
  console.log(data);
  const movies = data?.results || [];

  return (
    <section className="banner h-[700px] page-container mb-20 overflow-hidden from-slate-500">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({item}) {
  const { title, poster_path } = item;
  return (
    <div className="relative w-full h-full ">
      <div className="absolute inset-0 rounded-lg overlay bg-gradient-to-t "></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="object-cover w-full h-full rounded-sm"
      />
      <div className="absolute w-full bottom-5 left-5">
        <h2 className="mb-3 text-3xl font-bold text-white">
          {title}
        </h2>
        <div className="flex items-center pb-3 gap-x-3">
          <span className="p-2 font-medium text-purple-300 border border-white rounded-lg">
            Adventure
          </span>
          <span className="p-2 font-medium text-purple-300 border border-white rounded-lg">
            Action
          </span>
          <span className="p-2 font-medium text-purple-300 border border-white rounded-lg">
            Funny
          </span>
        </div>

        <div className="w-[100px]">
          <button className="flex px-6 py-3 font-semibold text-white transition bg-purple-400 rounded-lg hover:text-red-500 gap-x-3">
            <h1 className="">Watch now</h1>
            <FontAwesomeIcon
              icon={faYoutube}
              size="3x"
              className="transition cursor-pointer text-white-600"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
