import { Fragment } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import MovieList from "./components/movie/MovieList";
function App() {
  return (
    <Fragment>
      <header className="flex items-start justify-center py-10 mb-10 text-white header gap-x-5">
        <span className="text-primary">Home</span>
        <span>Movie</span>
      </header>
      <section className="banner h-[500px] page-container border border-solid border-black mb-20">
        <div className="relative w-full h-full ">
          <div className="absolute inset-0 rounded-lg overlay bg-gradient-to-t "></div>
          <img
            src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/04/the-avengers-feature.jpg"
            alt=""
            className="object-center w-full h-full rounded-sm"
          />
          <div className="absolute w-full bottom-5 left-5">
            <h2 className="mb-3 text-3xl font-bold text-white">
              Avengers: EndGame
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
      </section>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Now playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Top Rated
        </h2>
        <div className="grid grid-cols-4 gap-10 movie-list">
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
        </div>
      </section>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Trending
        </h2>
        <div className="grid grid-cols-4 gap-10 movie-list">
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
        </div>
      </section>
    </Fragment>
  );
}

export default App;
