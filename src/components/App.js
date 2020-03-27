import React, { useState } from "react";
import "../App.css";
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";

function App() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const search = searchValue => {
    setLoading(true);
    setError(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=e70ae208`)
      .then(response => response.json())
      .then(json => {
        if (json.Response === "True") {
          setMovies(json.Search);
          setLoading(false);
        } else {
          setError(json.Error);
          setLoading(false);
        }
      });
  };

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !error ? (
          <span>loading...</span>
        ) : error ? (
          <div className="errorMessage">{error}</div>
        ) : (
          movies
            .sort((a, b) => (a.Year < b.Year ? 1 : a.Year > b.Year ? -1 : 0))
            .map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
        )}
      </div>
    </div>
  );
}

export default App;
