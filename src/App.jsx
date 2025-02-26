import { useEffect, useState } from 'react';
import axios from "axios";
import MovieCard from './components/MovieCard';
import { motion } from 'framer-motion';
import './index.css'


function App() {
  const [movies, setMovies] = useState([]);
  const [years, setYears] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    axios
      .get("/api/api/v1/movies/all")
      .then((response) => {
        console.log("Fetched movies:", response.data);
        setMovies(response.data);
        const extractedYears = [
          ...new Set(response.data.map((movie) => movie.year)),
        ].filter(Boolean);

        setYears(extractedYears.sort((a, b) => b - a)); // Sort years descending
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  // Log movies and filters for debugging
  console.log("Movies:", movies);
  console.log("Search Term:", searchTerm);
  console.log("Rating Filter:", ratingFilter);
  console.log("Year Filter:", yearFilter);

  // Filtering logic
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter
      ? parseFloat(movie.rating) >= parseFloat(ratingFilter)
      : true;
    const matchesYear = yearFilter ? movie.year === yearFilter : true;

    return matchesSearch && matchesRating && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Minimalistic Navigation Bar */}
      <nav className="bg-white shadow-lg rounded-b-2xl p-6 mb-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <h1 className="text-3xl font-bold text-gray-700 tracking-wide">
            🎬Movies
          </h1>

          <div className="flex flex-wrap gap-4 items-center">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search movies..."
              className="p-3 rounded-full shadow-inner bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Rating Filter */}
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="p-3 rounded-full bg-gray-100 shadow-inner text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Rating</option>
              <option value="5">5+</option>
              <option value="6">6+</option>
              <option value="8">8+</option>
            </select>

            {/* Year Filter */}
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="p-3 rounded-full bg-gray-100 shadow-inner text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      {/* Display Movies */}
      <div className="p-8 max-w-7xl mx-auto">
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.movieId} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl font-semibold text-gray-600 mt-20">
            No movies found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}
export default App;

