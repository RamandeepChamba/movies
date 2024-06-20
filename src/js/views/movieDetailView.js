import icons from 'url:../../img/icons.svg';
import View from './View.js';
class MovieDetailView extends View {
  _data = null;

  // Movie detail
  _generateMarkup() {
    const movie = this._data;
    const stars = movie.imdbRating / 2;
    const starsAreFloat = stars % 1 !== 0;

    return `
      <div class="movie-detail">
        <div class="card mb-3" style="max-width: 540px">
          <div class="row g-0">
            <div class="col-md-4 movie__img">
              <img
                src="${movie.Poster}"
                class="img-fluid rounded-start"
                alt="${movie.Title} Poster"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title movie__title">${movie.Title}</h5>
                <span class="movie__rated">${movie.Rated}</span>
                <span class="movie__country">${movie.Country}</span>
                <div class="movie__release">${movie.Released}</div>
                <div class="movie__runtime">${movie.Runtime}</div>
                <div class="movie__ratings">
                  <span>${movie.imdbRating} / 10 Imdb</span>
                  ${[1, 2, 3, 4, 5]
                    .map(i => {
                      return `
                        <svg>
                            <use
                                xlink:href="${icons}#icon-star-${
                        i <= stars
                          ? 'full'
                          : i > stars && i - 1 < stars && starsAreFloat
                          ? 'half'
                          : 'empty'
                      }"
                            ></use>
                        </svg>
                    `;
                    })
                    .join('')}
                </div>
                <ul class="movie__genres">
                    ${movie.Genre.split(',')
                      .map(genre => `<li class="movie__genre">${genre}</li>`)
                      .join('')}                  
                </ul>
                <p class="card-text movie__plot">
                  ${movie.Plot}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }
}

export default new MovieDetailView();
