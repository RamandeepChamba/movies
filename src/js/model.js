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
    movie: null,
  },
};

export const fetchMovies = async function (query, page = 1) {
  try {
    const results = await AJAX(
      `${API_URL}/?apikey=${KEY}&s=${query.trim()}&page=${page}`
    );
    if (!results.Response) {
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
    const movie = await AJAX(`${API_URL}/?apikey=${KEY}&i=${id}`);
    if (!movie.Response) {
      throw new Error(results.Error);
    }
    state.search.movie = movie;
    clearSearchForMovieDetail();
    /*
    {
      Actors
      : 
      "Jim Belushi, Courtney Thorne-Smith, Larry Joe Campbell"
      Awards
      : 
      "Nominated for 4 Primetime Emmys. 21 nominations total"
      Country
      : 
      "United States"
      Director
      : 
      "N/A"
      Genre
      : 
      "Comedy, Romance"
      Language
      : 
      "English"
      Metascore
      : 
      "N/A"
      Plot
      : 
      "A television show centered around a macho everyman, his loving wife, and their three precocious children."
      Poster
      : 
      "https://m.media-amazon.com/images/M/MV5BMTY3NjU1NDg1Ml5BMl5BanBnXkFtZTcwMTQ5OTg5NA@@._V1_SX300.jpg"
      Rated
      : 
      "TV-PG"
      Ratings
      : 
      [{…}]
      Released
      : 
      "03 Oct 2001"
      Response
      : 
      "True"
      Runtime
      : 
      "30 min"
      Title
      : 
      "According to Jim"
      Type
      : 
      "series"
      Writer
      : 
      "Tracy Newman, Jonathan Stark"
      Year
      : 
      "2001–2009"
      imdbID
      : 
      "tt0285351"
      imdbRating
      : 
      "6.5"
      imdbVotes
      : 
      "38,302"
      totalSeasons
      : 
      "8"
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

// Clear search
const clearSearchForMovieDetail = function () {
  // search: {
  //   query: '',
  //   movies: [],
  //   dropdownMovies: [],
  //   page: 1,
  //   totalResults: 0,
  //   perPage: MOVIES_PER_PAGE,
  //   movie: null,
  // }
  state.search.query = '';
  state.search.movies = [];
  // state.search.dropdownMovies = [];
  state.search.page = 1;
  state.search.totalResults = 0;
};

export const removeDropdownMovies = function () {
  state.search.dropdownMovies = [];
};

export const resetState = function () {
  state.search.query = '';
  state.search.movies = [];
  state.search.movie = null;
  state.search.dropdownMovies = [];
  state.search.page = 1;
  state.search.totalResults = 0;
};
