import * as model from './model.js';
import moviesView from './views/moviesView.js';
import paginationView from './views/paginationView.js';
import searchView from './views/searchView.js';
import dropdownView from './views/dropdownView.js';

import 'core-js/stable';
import 'regenerator-runtime';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

///////////////////////////////////////
// OMDb API: http://img.omdbapi.com/?apikey=[yourkey]&
// if (module.hot) {
//   module.hot.accept();
// }

const controlSearchMovies = async function (query, page = 1) {
  try {
    moviesView.renderSpinner();
    if (!query) {
      await model.fetchMovies(model.state.search.query, page);
    } else {
      await model.fetchMovies(query, page);
    }
    moviesView.render(model.state.search.movies);
    paginationView.render(model.state.search);

    // Clear and hide dropdown
    controlHideDropdown();
  } catch (err) {
    moviesView.renderError();
  }
};

const controlSearchForDropdown = async function (query) {
  try {
    await model.fetchForDropdown(query);
    // show dropdown
    controlShowDropdown();
    dropdownView.render(model.state.search.dropdownMovies);
  } catch (err) {
    console.error(err.message);
  }
};

const controlDropdownViewAll = async function () {
  try {
    // Hide dropdown
    controlHideDropdown();
    // get search query from search bar
    const query = searchView.getQuery();
    // update url hash
    location.hash = `search=${query ? query : model.state.search.query}&page=1`;
  } catch (err) {
    console.error(err.message);
  }
};

const controlHideDropdown = function () {
  dropdownView.hide();
};
const controlShowDropdown = function () {
  dropdownView.show();
};

// Movie Detail
const controlMovieDetail = async function (id) {
  try {
    // Hide dropdown
    controlHideDropdown();
    // Render spinner in movies view
    moviesView.renderSpinner();
    // Fetch movie
    await model.fetchMovie(id);
    // clear and hide pagination
    paginationView.render(model.state.search);
    // Render movie
    moviesView.render(model.state.search.movie);
  } catch (err) {
    moviesView.renderError();
  }
};

const resetApp = function () {
  model.resetState();
  // clear search form input
  searchView.reset();
  // clear and hide pagination
  paginationView.render(model.state.search);
  // clear and hide dropdown
  dropdownView.render(model.state.search.dropdownMovies);
  controlHideDropdown();
  // clear and hide movies View
  moviesView.render(model.state.search.movies);
};

// ON URL HASH CHANGE
const controlHashChange = function () {
  // Possible hash values
  // 1. #search=mad%20max&page=1 (for movie list)
  // 2. #movie=id (for movie detail)
  const search = location.hash;
  if (!search) {
    // clear everything
    resetApp();
    return;
  }
  // 1
  if (search.indexOf('search=') !== -1 && search.indexOf('page=') !== -1) {
    const query = search.substring(
      search.indexOf('search=') + 7,
      search.indexOf('&')
    );
    const page = search.substring(search.indexOf('page=') + 5);
    controlSearchMovies(query, +page);
  }
  // 2
  if (search.indexOf('movie=') !== -1) {
    const movieId = search.substring(search.indexOf('movie=') + 6);
    controlMovieDetail(movieId);
  }
};

// Pagination button clicked
const controlPaginationClick = function (_, page) {
  // update url hash
  location.hash = `search=${model.state.search.query}&page=${page}`;
};

// Search form submitted
const controlFormSubmit = function (query) {
  // update url hash
  location.hash = `search=${query}&page=${1}`;
};

// Movie item clicked (from movies view or dropdown) to view detail
const controlMovieClick = function (id) {
  // update url hash
  location.hash = `movie=${id}`;
};

const init = function () {
  searchView.addHandlerSubmit(controlFormSubmit);
  searchView.addHandlerSearch(controlSearchForDropdown);
  searchView.addHandlerFocus(controlShowDropdown);
  searchView.addHandlerHashChange(controlHashChange);
  dropdownView.addHandlerViewAll(controlDropdownViewAll);
  dropdownView.addHandlerMovieClick(controlMovieClick);
  dropdownView.addHandlerClickedOutside(controlHideDropdown);
  paginationView.addHandlerPage(controlPaginationClick);
  moviesView.addHandlerMovieClick(controlMovieClick);
};
init();
