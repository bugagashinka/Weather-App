import Component from '../../../framework/Component';
import AppState from '../../../services/AppState';
import { KeyCode } from '../../../utils/const';

export const SEARCH_EVENT = 'SEARCH_EVENT';

const searchPlaceholderText = 'Search for city or coordinates';

export default class SearchBar extends Component {
  init() {
    this.searchField = null;
    this.searchValue = this.props.value;
  }

  inputHandler(e) {
    this.searchValue = `${e.target.value}`.toUpperCase();
    e.target.value = this.searchValue;
  }

  clickHandler({ target }) {
    target.select();
  }

  keyPressHandler(e) {
    if (e.keyCode === KeyCode.ENTER_KEY) {
      AppState.update(SEARCH_EVENT, { place: this.searchValue });
    }
  }

  afterRender() {
    this.searchField.value = this.searchValue;
  }

  render() {
    super.render();
    return `
      <input 
        id="search-field" 
        type="text"
        ref2v='${(ref) => (this.searchField = ref)}'
        onClick='${this.clickHandler}'
        onInput='${this.inputHandler}'
        onKeypress='${this.keyPressHandler}'
        class="input-search" 
        placeholder='${searchPlaceholderText}' 
      />`;
  }
}
