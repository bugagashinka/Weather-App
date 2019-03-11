const _classMap = {};

export const classMap = (...entityList) => {
  entityList.forEach(entity => {
    _classMap[entity.name] = entity;
  });
};

class ProxyClass {
  createInstance(name, ...params) {
    return new _classMap[name](...params);
  }

  isClass(name) {
    return _classMap[name];
  }
}
export default new ProxyClass();
