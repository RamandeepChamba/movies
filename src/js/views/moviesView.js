// import icons from 'url:../../img/icons.svg';
import View from './View.js';
import movieDetailView from './movieDetailView.js';
class MoviesView extends View {
  _data = null;
  _parentEl = document.querySelector('.results-container');
  _errorMessage = 'No movies found';

  _generateMarkup() {
    // If data is an array
    if (Array.isArray(this._data)) {
      // - render list
      return this._generateMoviesList();
    }
    // else
    // - render movie detail
    return movieDetailView.render(this._data, false);
  }
  // Movie list
  _generateMoviesList() {
    return (
      '<ul class="movies">' +
      this._data.map(movie => this._generateMoviesItem(movie)).join('') +
      '</ul>'
    );
  }
  _generateMoviesItem(movie) {
    return `
      <li class="movie" data-imdb-id="${movie.imdbID}">
        <div class="movie__img">
          <img
            src="${movie.Poster}"
            alt="${movie.Title} image"
          />
        </div>
        <div class="movie__data">
          <h4 class="movie__title">${movie.Title}</h4>
          <p class="movie__date">Release Date: <span>${movie.Year}</span></p>
          <button class="btn btn-primary view-detail">
            <span> View details </span>
          </button>
        </div>
      </li>
    `;
  }
  addHandlerMovieClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const viewDetailBtn = e.target.closest('.view-detail');
      if (!viewDetailBtn) return;
      const movie = viewDetailBtn.closest('.movie');
      handler(movie.dataset.imdbId);
    });
  }
}

export default new MoviesView();
