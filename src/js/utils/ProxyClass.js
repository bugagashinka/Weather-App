const classMap = {};

export const registerComponent = (...entityList) => {
  entityList.forEach((entity) => {
    classMap[entity.name] = entity;
  });
};

class ProxyClass {
  static createInstance(ClassName, ...params) {
    return typeof className === 'function'
      ? new ClassName(...params)
      : new classMap[ClassName](...params);
  }

  static isClass(className) {
    return classMap[className];
  }
}
export default ProxyClass;
