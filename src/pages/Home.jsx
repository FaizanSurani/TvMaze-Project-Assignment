import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("https://api.tvmaze.com/search/shows?q=avengers");
      const data = await res.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <>
      <div className="relative">
        <h1 className="text-6xl mb-6 px-7 py-3 text-center mt-6 border-2 border-black shadow-md bg-gray-600 text-white">
          Movie List
        </h1>
        <div className="px-4 py-2 mt-2 rounded shadow-lg text-center">
          <ul>
            {movies.map((movie) => (
              <li
                key={movie.show.id}
                className="border border-gray-400 mb-6 shadow-lg bg-gray-200">
                <Link to={`/movie/${movie.show.id}`}>
                  <h3 className="font-bold text-2xl mt-6 mb-6">
                    {movie.show.name}
                  </h3>
                </Link>
                <div className="mb-6">
                  <h2 className="text-blue-700 hover:text-blue-800 cursor-pointer mb-2">
                    {movie.show.url}
                  </h2>
                  <div className="flex justify-center items-center ">
                    <h2 className="font-serif text-lg mr-6">
                      {`Runtime : ${movie.show.averageRuntime} mins`}
                    </h2>
                    <h2 className="font-mono text-lg">{`Premiered On : ${movie.show.premiered}`}</h2>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
