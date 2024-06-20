// import icons from 'url:../../img/icons.svg';
import View from './View.js';
class PaginationView extends View {
  _data = null;
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    let markup = '';
    const page = +this._data.page;
    const numOfPages = Math.ceil(this._data.totalResults / this._data.perPage);

    if (!numOfPages) return '';
    // Previous
    if (page - 1 > 0) {
      markup += `<button class="btn-pagination btn-pagination--prev" data-goto="${
        page - 1
      }">&larr; Page ${page - 1}</button>`;
    }

    markup += `<span>${page} / ${numOfPages}</span>`;

    // Next
    if (page + 1 <= numOfPages) {
      markup += `<button class="btn-pagination btn-pagination--next" data-goto="${
        page + 1
      }">Page ${page + 1} &rarr;</button>`;
    }
    return markup;
  }
  addHandlerPage(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-pagination');
      if (!btn) return;
      handler(null, btn.dataset.goto);
    });
  }
}

export default new PaginationView();
