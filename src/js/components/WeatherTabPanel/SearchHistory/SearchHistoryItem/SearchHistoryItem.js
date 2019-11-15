import Component from '../../../../framework/Component';
import { LIST_LOC_EVENT } from '../../../../utils/const';

import AppState from '../../../../services/AppState';

export default class SearchHistoryItem extends Component {
  remove(location) {
    // propagate 'location' to parent listener
  }

  removeHandler() {
    this.remove(this.props.location);
  }

  revisitLocation() {
    AppState.update(LIST_LOC_EVENT, { place: this.props.location });
  }

  render() {
    return `
      <div class="search-item">
        <div class="search-item-content">
          <div class="search-item-loc" onClick="${this.revisitLocation}">
              ${this.props.location}
          </div>
          <div class="search-item-date">
            ${new Date(Number(this.props.searchTime)).toDateString()}
          </div>
        </div>
        <button 
          class="search-item-remove" 
          onClick="${this.removeHandler}">
        </button>
      </div>`;
  }
}
