import Component from '../../../framework/Component';

const DUMMY_STYLE_CLASS = '';
const REGULAR_STAR_STYLE = 'fas';

export default class FavoriteLocation extends Component {
  init() {
    this.isChecked = this.props.checked === 'true';
    this.favCheckboxNode = null;
  }

  clickHandler({ target }) {
    this.changeStatus((this.isChecked = !this.isChecked), target);
  }

  changeStatus(status, elementNode) {
    elementNode.classList.toggle(REGULAR_STAR_STYLE, status);
  }

  uncheck() {
    this.favCheckboxNode.classList.toggle(REGULAR_STAR_STYLE, (this.isChecked = false));
  }

  render() {
    super.render();
    return `
      <button
        class="favorite-button" 
        onClick='${this.clickHandler}'>
        <i class="far fa-star 
           ${this.props.checked === 'true' ? REGULAR_STAR_STYLE : DUMMY_STYLE_CLASS}"
           ref2v='${(ref, comp) => {
             comp.favCheckboxNode = ref;
           }}'>
        </i>
    </button>`;
  }
}
