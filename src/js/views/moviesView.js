// import icons from 'url:../../img/icons.svg';
import View from './View.js';
class MoviesView extends View {
  _data = null;
  _parentEl = document.querySelector('.results-container');
  _errorMessage = 'No movies found';

  _generateMarkup() {
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
          <button class="btn">
            <a href="#"> View details </a>
          </button>
        </div>
      </li>
    `;
  }
}

export default new MoviesView();
