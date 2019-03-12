const _classMap = {};

export const classMap = (...entityList) => {
  entityList.forEach(entity => {
    _classMap[entity.name] = entity;
  });
};

class ProxyClass {
  createInstance(className, ...params) {
    return typeof className === "function"
      ? new className(...params)
      : new _classMap[className](...params);
  }

  isClass(className) {
    return typeof className === "function" ? true : _classMap[className];
  }
}
export default new ProxyClass();
