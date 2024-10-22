const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const movieContainer = document.getElementById("movies-container");

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
    .then((data) => {
      console.log(data);
      render(data);
    });
}

function render(data) {
  movieContainer.innerHTML += `
    <div class="movie-div">
        <div>
            <img class="movie-poster" src=${data.Poster}/>
        </div>
        <div class="movie-details">
            <div class="title-details">
                <p class="title">${data.Title} <span class="rating">⭐️ ${data.Ratings[0].Value}</span></p>
            </div>
            <div class="watch-details">
                <p>${data.Runtime} ${data.Genre}</p>
                <p><a href="#" id="watchlist-btn">
                    <img src="assets/add-icon.png"/>
                    Watchlist
                </a></p>
            </div>
            <div class="summary-div">
                <p class="summary">${data.Plot}</p>
            </div>
        </div>
    </div>
    `;
}
