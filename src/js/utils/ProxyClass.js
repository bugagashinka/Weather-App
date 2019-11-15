const classMap = {};

export const registerComponent = (...entityList) => {
  entityList.forEach((entity) => {
    classMap[entity.name] = entity;
  });
};

class ProxyClass {
  static createInstance(className, ...params) {
    return typeof className === 'function'
      ? new className(...params)
      : new classMap[className](...params);
  }

  static isClass(className) {
    const isFunction = typeof className === 'function';
    return isFunction || classMap[className] || false;
  }
}
export default ProxyClass;
