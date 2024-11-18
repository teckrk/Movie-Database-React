import React, { useState, useEffect } from "react";
import "./App.css";
import movieimage from './movieimage.jpg';
function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://dummyapi.online/api/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const BASE_URL = "https://dummyapi.online/";

  const DEFAULT_IMAGE = movieimage;

  return (
    <div className="App">
      <h1>Movie Database</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <div className="movies-container">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                // src={movie.image ? `${BASE_URL}${movie.image}` : DEFAULT_IMAGE}
                src={movie.image ? DEFAULT_IMAGE : DEFAULT_IMAGE}
                alt={movie.movie}
                className="movie-image"
              />

              <h2>{movie.movie}</h2>
              <p>Rating: {movie.rating}</p>
              <a href={movie.imdb_url} target="_blank" rel="noopener noreferrer">
                View on IMDb
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}

export default App;
