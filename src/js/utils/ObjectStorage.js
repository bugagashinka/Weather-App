import Storage from './Storage';
import AppState from '../services/AppState';

class ObjectStorage extends Storage {
  addItem(key, objValue) {
    let updateObject;
    if (!super.getItem(key)) {
      updateObject = objValue;
    } else {
      const [objValueKey] = Object.keys(objValue);
      updateObject = this.getObject(key);
      updateObject[objValueKey] = objValue[objValueKey];
    }
    const res = super.setItem(key, JSON.stringify(updateObject));
    if (res) {
      AppState.update(key, updateObject);
    }
    return res;
  }

  getObject(key) {
    const obj = JSON.parse(super.getItem(key));
    return obj || {};
  }

  removeItem(key, objKey) {
    const updateObject = JSON.parse(super.getItem(key));
    delete updateObject[objKey];
    const res = super.setItem(key, JSON.stringify(updateObject));

    if (res) {
      AppState.update(key, updateObject);
    }

    return res;
  }

  isExist(key, objValue) {
    const obj = super.getItem(key);
    return obj ? obj[objValue.key] : false;
  }
}

export default new ObjectStorage();
