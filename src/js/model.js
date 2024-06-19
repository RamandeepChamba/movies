import {
  API_URL,
  KEY,
  MOVIES_PER_PAGE,
  MAX_MOVIES_DROPDOWN,
} from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  search: {
    query: '',
    movies: [],
    dropdownMovies: [],
    page: 1,
    totalResults: 0,
    perPage: MOVIES_PER_PAGE,
  },
};

export const fetchMovies = async function (query, page = 1) {
  try {
    const results = await AJAX(
      `${API_URL}/?apikey=${KEY}&s=${query.trim()}&page=${page}`
    );
    if (!results.Response) {
      console.log('ran');
      throw new Error(results.Error);
    }
    // console.log(results);
    state.search.query = query;
    state.search.page = page;
    state.search.movies = [...results.Search];
    state.search.totalResults = results.totalResults;
    /*
    [{
      Poster
      : 
      "https://m.media-amazon.com/images/M/MV5BNzc4MDhiMWUtNTY5Ny00NWY3LTk0ZmItM2NlYmRmOWQzNGVmXkEyXkFqcGdeQXVyNjc5NjEzNA@@._V1_SX300.jpg"
      Title: "Wrong Turn"
      Type: "movie"
      Year: "2003"
      imdbID: "tt0295700"
    }]
    */
  } catch (err) {
    throw err;
  }
};
// Single movie
export const fetchMovie = async function (id) {
  try {
    console.log('Searching movie...');
    const movie = await AJAX(`${API_URL}/?apikey=${KEY}&i=${id}`);
    console.log(movie);
    /*
      {
        Poster
        : 
        "https://m.media-amazon.com/images/M/MV5BNzc4MDhiMWUtNTY5Ny00NWY3LTk0ZmItM2NlYmRmOWQzNGVmXkEyXkFqcGdeQXVyNjc5NjEzNA@@._V1_SX300.jpg"
        Title: "Wrong Turn"
        Type: "movie"
        Year: "2003"
        imdbID: "tt0295700"
      }
      */
  } catch (err) {
    throw err;
  }
};

// Movies for dropdown
export const fetchForDropdown = async function (query) {
  try {
    if (!query) removeDropdownMovies();
    const results = await AJAX(`${API_URL}/?apikey=${KEY}&s=${query}`);
    if (results.Search) {
      state.search.dropdownMovies = results.Search.slice(
        0,
        MAX_MOVIES_DROPDOWN
      );
    }
  } catch (err) {
    throw err;
  }
};

export const removeDropdownMovies = function () {
  state.search.dropdownMovies = [];
};
