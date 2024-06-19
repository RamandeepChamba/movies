import * as model from './model.js';
import moviesView from './views/moviesView.js';
import paginationView from './views/paginationView.js';
import searchView from './views/searchView.js';

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
  } catch (err) {
    console.error(err.message);
  }
};

const init = function () {
  // controlSearchMovies('wrong');
  searchView.addHandlerSubmit(controlSearchMovies);
  paginationView.addHandlerPage(controlSearchMovies);
};
init();
