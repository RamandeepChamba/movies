import View from './View.js';
class SearchView extends View {
  _data = null;
  _parentEl = document.querySelector('.form');

  getQuery() {
    return this._parentEl.querySelector('.search-query').value;
  }

  // on submit
  addHandlerSubmit(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = this.querySelector('.search-query').value;
      handler(query);
    });
  }
  // While typing
  addHandlerSearch(handler) {
    this._parentEl
      .querySelector('.search-query')
      .addEventListener('input', function (e) {
        handler(this.value);
      });
  }
}

export default new SearchView();
