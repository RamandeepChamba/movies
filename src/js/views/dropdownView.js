import View from './View.js';
class DropdownView extends View {
  _data = null;
  _parentEl = document.querySelector('.dropdown');
  _errorMessage = 'No movies found';

  _generateMarkup() {
    return (
      '<div class="dropdown__list list-group">' +
      this._data.map(movie => this._generateMoviesItem(movie)).join('') +
      '</div>' +
      '<button class="btn btn-primary view-all">View All</button>'
    );
  }
  _generateMoviesItem(movie) {
    return `
      <a href="#${movie.imdbID}" class="dropdown__item list-group-item">
        <div class="dropdown__img">
          <img
            src="${movie.Poster}"
            alt="${movie.Title} image"
          />
        </div>
        <div class="dropdown__data">
          <h4 class="dropdown__title">${movie.Title}</h4>
          <p class="dropdown__date">Release Date: <span>${movie.Year}</span></p>
        </div>
      </a>
    `;
  }
  hide() {
    this._clear();
  }
  // User clicks view all
  addHandlerViewAll(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const viewAllBtnEl = e.target.closest('.view-all');
      if (!viewAllBtnEl) return;
      handler();
    });
  }
}

export default new DropdownView();
