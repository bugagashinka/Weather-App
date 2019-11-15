export default class Storage {
  constructor() {
    if (this.constructor === Storage) {
      throw TypeError(
        `Class '${this.constructor.name}' abstract and cannot be instantiated directly`,
      );
    }
  }

  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  getItem(key) {
    return localStorage.getItem(key);
  }

  remove(key) {
    return localStorage.removeItem(key);
  }
}
