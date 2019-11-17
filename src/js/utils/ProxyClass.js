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
    return classMap[className];
  }
}
export default ProxyClass;
