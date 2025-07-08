export  const fetcher = (...args) => fetch(...args).then(res => res.json());
export const apiKey="bd4a994d57d4e648fd2a696735ed063f";
const tmdbEnpoint="https://api.themoviedb.org/3/movie";
export const tmdbAPI={
    getMovieList:(type)=> `${tmdbEnpoint}/${type}?api_key=${apiKey}`,
    getMovieDetails:(movieId)=>`${tmdbEnpoint}/${movieId}?api_key=${apiKey}`,
    getMovieMeta:(movieId,type)=>`${tmdbEnpoint}/${movieId}/${type}?api_key=${apiKey}`,
    imageOriginal:(url)=>`https://image.tmdb.org/t/p/original/${url}`,
    image500:(url)=>`https://image.tmdb.org/t/p/w500/${url}`
}