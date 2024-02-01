import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function BookingForm() {
  const { id } = useParams();
  const [moviesDetails, setMoviesDetails] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const { name, email } = formData;

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const data = await res.json();
      setMoviesDetails([data]);
    };
    fetchMovies();
  }, [id]);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    setFormData({ name: "", email: "" });
  };

  return (
    <>
      <h1 className="text-6xl mb-6 px-7 py-3 text-center mt-6 border-2 border-black shadow-md bg-gray-600 text-white rounded">
        Booking Form
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mt-6 mb-6 flex justify-center items-center">
            {moviesDetails.map((movie) => (
              <input
                key={movie.id}
                type="text"
                value={movie.name}
                className="px-7 py-3 w-[40%] text-center rounded shadow-md border border-gray-600 hover:border-gray-700 uppercase font-bold"
                disabled
              />
            ))}
          </div>
          <div className="flex justify-center items-center flex-col">
            <input
              type="text"
              onChange={handleFormData}
              id="name"
              value={name}
              placeholder="Name"
              className="mt-6 mb-6 px-7 py-3 w-[40%] rounded shadow-md border border-gray-600 hover:border-gray-700"
            />
            <input
              type="text"
              onChange={handleFormData}
              id="email"
              value={email}
              placeholder="Email"
              className="mb-6 px-7 py-3 w-[40%] rounded shadow-md border border-gray-600 hover:border-gray-700"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-600 px-7 py-3 mt-6 text-white w-[40%] uppercase font-semibold hover:bg-blue-700 border border-gray-600 hover:border-gray-700 rounded transition duration-150 ease-in-out">
            Submit Details
          </button>
        </div>
      </form>
    </>
  );
}
