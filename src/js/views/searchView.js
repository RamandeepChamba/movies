import View from './View.js';
class SearchView extends View {
  _data = null;
  _parentEl = document.querySelector('.form');

  addHandlerSubmit(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = this.querySelector('.search-query').value;
      handler(query);
    });
  }
}

export default new SearchView();
