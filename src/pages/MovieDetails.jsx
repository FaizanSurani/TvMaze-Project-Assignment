import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const [moviesDetails, setMoviesDetails] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const data = await res.json();
      setMoviesDetails([data]);
    };
    fetchMovies();
  }, [id]);
  return (
    <>
      <div>
        <h1 className="text-6xl mb-6 px-7 py-3 text-center mt-6 border-2 border-black shadow-md bg-gray-600 text-white rounded">
          Movie Details
        </h1>
        <div>
          {moviesDetails.map((movie) => (
            <ul>
              <h3 className="text-3xl mb-6 text-center px-7 py-3 shadow-2xl rounded">
                {movie.name}
              </h3>
              <li
                key={movie.id}
                className="mt-6 mb-6 text-3xl text-center px-7 py-3">
                {movie.summary}
              </li>
              <div className="flex justify-center items-center flex-col">
                <h3 className="font-serif text-lg mr-6">
                  {`Runtime : ${movie.averageRuntime} mins`}
                </h3>
                <h3 className="font-mono text-lg">{`Premiered On : ${movie.premiered}`}</h3>
              </div>
            </ul>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center">
          <Link to={`/booking/${id}`}>
            <button className="px-7 py-3 text-white bg-blue-600 w-full rounded uppercase font-semibold transition duration-150 ease-in-out hover:bg-blue-700 active:bg-blue-800">
              Book Ticket
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
