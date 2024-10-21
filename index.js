const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getMovies(searchInput);
});

function getMovies(searchedMovie) {
  fetch(`http://www.omdbapi.com/?apikey=f490edf1&s=${searchedMovie.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "True") {
        data.Search.forEach((movie) => {
          getMovieDetails(movie.imdbID);
        });
      }
    });
}

function getMovieDetails(id) {
  fetch(`http://www.omdbapi.com/?apikey=f490edf1&i=${id}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}
