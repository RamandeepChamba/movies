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
      await model.fetchMovies(query);
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
    // fetch and render movies
    await controlSearchMovies(query);
  } catch (err) {
    console.error(err.message);
  }
};

const controlHideDropdown = function () {
  // remove dropdown movies
  model.removeDropdownMovies();
  // clear and hide dropdown
  dropdownView.hide();
};

const init = function () {
  searchView.addHandlerSubmit(controlSearchMovies);
  searchView.addHandlerSearch(controlSearchForDropdown);
  dropdownView.addHandlerViewAll(controlDropdownViewAll);
  paginationView.addHandlerPage(controlSearchMovies);
};
init();
