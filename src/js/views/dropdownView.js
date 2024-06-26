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
  // hide() {
  //   this._clear();
  // }

  hide() {
    this._parentEl.classList.add('hidden');
  }
  show() {
    this._parentEl.classList.remove('hidden');
  }
  // User clicks view all
  addHandlerViewAll(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const viewAllBtnEl = e.target.closest('.view-all');
      if (!viewAllBtnEl) return;
      handler();
    });
  }
  // User clicks on one of the movies in dropdown
  addHandlerMovieClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const movie = e.target.closest('.dropdown__item');
      if (!movie) return;
      // #id -> id
      handler(movie.getAttribute('href').substring(1));
    });
  }
  // Hide when clicked outside the dropdown
  // and search bar (don't want to hide if searchbar is focused even though dropdown is not focused)
  addHandlerClickedOutside(handler) {
    document.addEventListener('click', function (e) {
      // dropdown or search bar
      if (e.target.closest('.dropdown') || e.target.closest('.search-query'))
        return;
      // outside
      handler();
    });
  }
}

export default new DropdownView();
