let watchlist;
const movieList = document.getElementById("watchlist-container");
getWatchList();
renderWatchlist();

function getWatchList() {
  const storedWatchlist = localStorage.getItem("movies");
  if (storedWatchlist) {
    watchlist = JSON.parse(storedWatchlist);
  } else {
    watchlist = {};
  }
}

function renderWatchlist() {
  getWatchList();
  let movieHtml = "";
  for (let [id, detail] of Object.entries(watchlist)) {
    movieHtml += `
       <div class="movie-div">
          <div>
              <img class="movie-poster" src=${detail.Poster}/>
          </div>
          <div class="movie-details">
              <div class="title-details">
                  <p class="title">${detail.Title} <span class="rating">⭐️ ${detail.Ratings[0].Value}</span></p>
              </div>
              <div class="watch-details">
                  <p>${detail.Runtime} ${detail.Genre}</p>
                  <p><a id='watchlist-btn-${id}' class="remove-btn">
                      Remove
                  </a></p>
              </div>
              <div class="summary-div">
                  <p class="summary">${detail.Plot}</p>
              </div>
          </div>
      </div>
    `;
  }
  movieList.innerHTML = movieHtml;
  bindRemoveEventListeners();
}

function bindRemoveEventListeners() {
  Object.keys(watchlist).forEach((id) => {
    const removeBtn = document.getElementById(`watchlist-btn-${id}`);
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        removeMovie(id);
      });
    }
  });
}

function removeMovie(id) {
  if (watchlist && watchlist.hasOwnProperty(id)) {
    delete watchlist[id];
    localStorage.setItem("movies", JSON.stringify(watchlist));
    renderWatchlist();
  }
}
