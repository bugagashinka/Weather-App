import { Slider } from '../../Slider';
import AppState from '../../../services/AppState';
import { isString } from '../../../utils/utils';
import { FavoriteLocationItem } from './FavoriteLocationItem';
import ArrayStorage from '../../../utils/ArrayStorage';
import { registerComponent } from '../../../utils/ProxyClass';
import { STORAGE_FAV_LIST } from '../../../utils/const';

const EMPTY_LIST_STUB = '<span>List is empty</span>';

export default class FavoriteList extends Slider {
  init() {
    this.initState({
      favList: this.buildList(ArrayStorage.getList(STORAGE_FAV_LIST)),
    });
    AppState.watch(STORAGE_FAV_LIST, this.updateList.bind(this));
  }

  updateList(data = []) {
    this.setState({
      favList: this.buildList(data),
    });
  }

  unchecked(location) {
    ArrayStorage.removeItem(STORAGE_FAV_LIST, location);
  }

  buildList(data) {
    const list = (isString(data) ? [data] : data).map((loc) => {
      return `
        <FavoriteLocationItem 
          loc="${loc}" 
          onChangeStatus="${this.unchecked}"
        />`;
    });
    return list ? list.reverse().join('') : EMPTY_LIST_STUB;
  }

  renderList() {
    return `${this.state.favList}`;
  }
}

registerComponent(FavoriteLocationItem);
