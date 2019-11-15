import { Slider } from '../../Slider';
import AppState from '../../../services/AppState';
import { SearchHistoryItem } from './SearchHistoryItem';
import ObjectStorage from '../../../utils/ObjectStorage';
import { registerComponent } from '../../../utils/ProxyClass';
import { STORAGE_SEARCH_LIST } from '../../../utils/const';

const EMPTY_LIST_STUB = '<span>List is empty</span>';

export default class SearchHistory extends Slider {
  init() {
    this.initState({
      searchList: this.buildList(ObjectStorage.getObject(STORAGE_SEARCH_LIST)),
    });
    AppState.watch(STORAGE_SEARCH_LIST, this.updateList.bind(this));
  }

  updateList(data) {
    this.setState({
      searchList: this.buildList(data),
    });
  }

  itemWasRemoved(location) {
    ObjectStorage.removeItem(STORAGE_SEARCH_LIST, location);
  }

  buildList(data = {}) {
    const list = Object.keys(data)
      .sort((loc1, loc2) => {
        return data[loc2].searchTime - data[loc1].searchTime;
      })
      .map((loc) => {
        return `
          <SearchHistoryItem 
            location="${loc}" 
            searchTime="${data[loc].searchTime}"
            onRemove="${this.itemWasRemoved}"
          />`;
      });
    return list ? list.join('') : EMPTY_LIST_STUB;
  }

  renderList() {
    return `${this.state.searchList}`;
  }
}

registerComponent(SearchHistoryItem);
