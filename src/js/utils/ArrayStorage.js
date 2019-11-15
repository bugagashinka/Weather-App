import Storage from './Storage';
import AppState from '../services/AppState';

class ArrayStorage extends Storage {
  addItem(key, value) {
    let updateList;
    if (!super.getItem(key)) {
      updateList = [value];
    } else {
      updateList = super.getItem(key).split(',');
      updateList.push(value);
    }
    const res = super.setItem(key, updateList);
    if (res) {
      AppState.update(key, updateList);
    }
    return res;
  }

  getList(key) {
    const value = super.getItem(key);
    return value ? value.split(',') : [];
  }

  removeItem(key, value) {
    const updateList = super.getItem(key).split(',');
    updateList.splice(updateList.indexOf(value), 1);
    const res = super.setItem(key, updateList);

    if (res) {
      AppState.update(key, updateList);
    }

    return res;
  }

  isExist(key, value) {
    const list = super.getItem(key);
    return list ? list.split(',').includes(value) : false;
  }
}

export default new ArrayStorage();
