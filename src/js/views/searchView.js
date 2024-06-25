import View from './View.js';
class SearchView extends View {
  _data = null;
  _parentEl = document.querySelector('.form');

  getQuery() {
    return this._parentEl.querySelector('.search-query').value;
  }

  reset() {
    this._parentEl.querySelector('.search-query').value = '';
    this._parentEl.querySelector('.search-query').focus();
  }

  // on submit
  addHandlerSubmit(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      this.querySelector('.search-query').blur();
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
  // On focus
  // - show / unhide dropdown
  addHandlerFocus(handler) {
    this._parentEl
      .querySelector('.search-query')
      .addEventListener('focus', function (e) {
        handler();
      });
  }

  // URL / hash change
  addHandlerHashChange(handler) {
    ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, handler));
  }
}

export default new SearchView();
