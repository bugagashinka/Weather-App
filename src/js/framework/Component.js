import ProxyClass from '../utils/ProxyClass';
import AppState from '../services/AppState';
import { isString } from '../utils/utils';

const PARSE_XML = 'text/xml';
const TEXT_NODE = '#text';
const DOM_PARSER = new DOMParser();
const COMPONENT_MOUNTED_EVENT = 'COMPONENT_MOUNTED';
const HANDLER_ATTR_NAME_PREFIX = 'on';

const PROTO_TAG_PROPERTY = 'tag';
const PROTO_HANDLERS_PROPERTY = 'eventHandlers';
const PROTO_CONTENT_PROPERTY = 'content';
const PROTO_ATTRIBUTES_PROPERTY = 'attributes';
const PROTO_CHILDREN_PROPERTY = 'children';

const vDomTree = new Map();
let isReRender = false;
let rootComponent;

export default class Component {
  constructor(host, props = {}) {
    if (this.constructor === Component) {
      throw TypeError(
        `Class '${this.constructor.name}' abstract and cannot be instantiated directly`,
      );
    }

    this.host = host;
    this.props = props;

    this._normalizeMethodForSerialization();

    this.init();
    this.beforeRender();
    this._render();
    this._afterRender();
  }

  init() {}

  beforeRender() {}

  _render() {
    // Content contain String || [String]. String consist from html tags and custom component tags
    let content = this.render();

    if (isString(content)) {
      content = [content];
    }

    if (!vDomTree.has(this)) {
      // Memorizing root component, after mounted it into document will be initiated 'afterRender'
      if (!vDomTree.size) {
        rootComponent = this.constructor.name;
      }
      vDomTree.set(this, { children: [] });
      AppState.watch(COMPONENT_MOUNTED_EVENT, this.afterRender.bind(this));
    }

    content
      .map((contentItem) => {
        return isString(contentItem)
          ? this._htmlElementToVirtualDomPrototype(
              this._parseStringIntoHtmlElement(contentItem),
            )
          : contentItem;
      })
      .map((prototypeItem) =>
        // the result array contains DOM elements
        this._vDomPrototypeElementToHtmlElement(prototypeItem),
      )
      .forEach((htmlElement) => {
        if (isReRender && vDomTree.get(this).componentNode) {
          const oldHtmlElementNode = vDomTree.get(this).componentNode;
          oldHtmlElementNode.replaceWith(htmlElement);
          vDomTree.get(this).componentNode = htmlElement;
        } else {
          vDomTree.get(this).componentNode = this.host.appendChild(htmlElement);
        }
      });
  }

  clear() {}

  render() {}

  // notify all components, when first/root component rendered and attached to the document
  _afterRender() {
    // console.info(`After render | ${this.constructor.name}`);
    if (this.constructor.name === rootComponent) {
      AppState.update(COMPONENT_MOUNTED_EVENT);
    } else if (isReRender) {
      this.afterRender();
    }
  }

  afterRender() {}

  initState(state) {
    this.state = { ...state };
  }

  setState(newState) {
    if (!this.state) {
      throw new Error(`${this.constructor.name} component doesn't have state yet`);
    }
    this.state = { ...this.state, ...newState };
    this.beforeRender();

    vDomTree.get(this).children.forEach((childComp) => {
      childComp.clear();
      vDomTree.delete(childComp);
    });
    vDomTree.get(this).children.length = 0;

    isReRender = !isReRender;
    this._render();
    this._afterRender();
    isReRender = !isReRender;
  }

  static createObject(plainObject) {
    return `object${JSON.stringify(plainObject).replace(/"/g, '&quot;')}`;
  }

  // This wheel use only for impose explicit property creation in component
  static createRef() {
    // return Declared (sub)Component with ref-property, as a value for parent component property created with 'createRef'
    return function _createRef(subComponent) {
      return subComponent;
    };
  }

  _normalizeMethodForSerialization() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach((method) => {
      if (typeof this[method] === 'function') {
        this[method].toString = ((origin) => {
          return () => {
            return origin.replace(/"/g, "'");
          };
        })(this[method].toString());
      }
    });
  }

  _checkRefProp(props, childComp) {
    // 'this' - it's parent component
    if (!props.ref) return;

    if (typeof this[props.ref] !== 'function' && this[props.ref].name !== '_createRef') {
      throw new Error('Use Component.createRef for create property');
    }
    this[props.ref] = this[props.ref](childComp);
  }

  static createRef2v() {
    return 'createRef2v';
    // return function _createRef2v() {};
  }

  _checkRef2vProp(props, childComp) {
    if (!props.ref) return;

    if (typeof this[props.ref] !== 'function') {
      throw new Error('Use arrow function');
    }
    this[props.ref]();
  }

  // Convert dom nodes to object literals (proto)
  _htmlElementToVirtualDomPrototype(htmlElement) {
    if (htmlElement.nodeName === TEXT_NODE) {
      // handle newline characters and text nodes
      if (!htmlElement.data.trim().length) return null;
      return {
        [PROTO_TAG_PROPERTY]: TEXT_NODE,
        [PROTO_CONTENT_PROPERTY]: htmlElement.data.trim(),
        [PROTO_CHILDREN_PROPERTY]: [],
      };
    } else {
      const elementAttrs = this._getElementAttr(htmlElement);
      return {
        [PROTO_TAG_PROPERTY]: `${htmlElement.nodeName}`,
        [PROTO_ATTRIBUTES_PROPERTY]: elementAttrs.filter(
          ({ name }) => !name.startsWith(HANDLER_ATTR_NAME_PREFIX),
        ),
        [PROTO_HANDLERS_PROPERTY]: elementAttrs.reduce((handlers, { name, value }) => {
          if (name.startsWith(HANDLER_ATTR_NAME_PREFIX)) {
            handlers[name.slice(HANDLER_ATTR_NAME_PREFIX.length)] = value;
          }
          return handlers;
        }, {}),
        [PROTO_CHILDREN_PROPERTY]: htmlElement.childNodes.length
          ? Array.from(htmlElement.childNodes).map(
              this._htmlElementToVirtualDomPrototype.bind(this),
            )
          : [],
      };
    }
  }

  _getElementAttr(htmlElement) {
    return Array.from(htmlElement.attributes).map(({ value, name }) => {
      return {
        name,
        value,
      };
    });
  }

  _removeSpaceSpecialCharacters(content) {
    return content.replace(/\n?\n|\r|\s+/g, ' ').trim();
  }

  _removeComment(content) {
    return content.replace(/(\/\*[^*]*\*\/)|(\/\/[^*\n\r]*)[\n\r]/g, '').trim();
  }

  // Parse html elements from string into DOM nodes
  _parseStringIntoHtmlElement(content) {
    const parsedDocument = DOM_PARSER.parseFromString(
      this._removeSpaceSpecialCharacters(this._removeComment(content)),
      PARSE_XML,
    ).firstChild;
    const parseError = parsedDocument.getElementsByTagName('parsererror')[0];
    if (parseError) {
      throw new Error(
        `Component ${this.constructor.name} has markup ${
          parseError.innerText.split(':')[1]
        }.
        Check the validity of the markup. Use double quotes for html attributes and single quotes for string content of handlers methods.`,
      );
    }
    return parsedDocument;
  }

  _attrToPropsFormat(attrs) {
    return attrs && attrs.length
      ? attrs.reduce((props, attr) => {
          // 'object' prefix is used to mark serialized into json plain js object
          props[attr.name] = attr.value.startsWith('object')
            ? JSON.parse(attr.value.replace('object', ''))
            : attr.value;
          return props;
        }, {})
      : {};
  }

  _vDomPrototypeElementToHtmlElement(
    protoElement,
    parent = document.createDocumentFragment(),
  ) {
    if (ProxyClass.isClass(protoElement.tag)) {
      // It's a component
      return this._componentElementToHTML(protoElement, parent);
    }
    // It's not a component
    return this._plainElementToHTML(protoElement, parent);
  }

  _componentElementToHTML(protoElement, parent) {
    const props = this._attrToPropsFormat(protoElement.attributes);
    const comp = ProxyClass.createInstance(protoElement.tag, parent, props);

    if (protoElement.eventHandlers) {
      Object.keys(protoElement.eventHandlers).forEach((innerHandlerName) => {
        // eslint-disable-next-line no-new-func
        const outerHandlerName = new Function(
          `return ${protoElement.eventHandlers[innerHandlerName]}`,
        )().name;
        innerHandlerName =
          innerHandlerName.charAt(0).toLowerCase() + innerHandlerName.slice(1);
        if (typeof comp[innerHandlerName] !== 'function')
          throw new Error(
            `${comp.constructor.name} component doesn't have a ${innerHandlerName} method`,
          );
        const that = this;
        comp[innerHandlerName] = new Proxy(comp[innerHandlerName].bind(comp), {
          apply(innerHandler, context, args) {
            that[outerHandlerName].bind(that)(...args);
            return innerHandler.apply(context, args);
          },
        });
      });
    }
    this._checkRefProp(props, comp);

    if (props.ref2v) {
      // reconstruction 'function' from string and call from current sub-component ('this') with argument - component node
      // eslint-disable-next-line no-new-func
      new Function(`return ${props.ref2v.replace(/_this[0-9]*/g, 'comp')}`)
        .call()
        .call(null, comp, this);
      // protoElement.attributes
    }
    vDomTree.get(this).children.push(comp);
    return parent;
  }

  _plainElementToHTML(protoElement) {
    const htmlElement =
      protoElement.tag === TEXT_NODE
        ? document.createTextNode(protoElement.content)
        : document.createElement(protoElement.tag);

    if (protoElement.content) {
      htmlElement.innerHTML = protoElement.content;
    }

    // ensure that following prototype properties are Array
    [PROTO_ATTRIBUTES_PROPERTY, PROTO_CHILDREN_PROPERTY].forEach((item) => {
      if (protoElement[item] && !Array.isArray(protoElement[item])) {
        protoElement[item] = [protoElement[item]];
      }
    });

    if (protoElement.attributes) {
      protoElement.attributes.forEach((attributeSpec) => {
        if (attributeSpec.name !== 'ref' && attributeSpec.name !== 'ref2v') {
          htmlElement.setAttribute(attributeSpec.name, attributeSpec.value);
        }

        if (attributeSpec.name === 'ref') {
          if (typeof this[attributeSpec.value] !== 'function') {
            throw new Error('Use arrow function');
          }
          this[attributeSpec.value] = this[attributeSpec.value](htmlElement);
        }
        if (attributeSpec.name === 'ref2v') {
          // reconstruction 'function' from string and call from current sub-component ('this') with argument - component node
          // eslint-disable-next-line no-new-func
          new Function(`return ${attributeSpec.value.replace(/_this[0-9]*/g, 'comp')}`)
            .call()
            .call(null, htmlElement, this);
        }
      });
    }

    if (protoElement.eventHandlers) {
      Object.keys(protoElement.eventHandlers).forEach((eventType) => {
        // eslint-disable-next-line no-new-func
        const handlerName = new Function(
          `return ${protoElement.eventHandlers[eventType]}`,
        )().name;
        htmlElement.addEventListener(
          eventType.toLowerCase(),
          this[handlerName].bind(this),
        );
      });
    }

    // process children
    if (protoElement.children) {
      protoElement.children.forEach((childElement) => {
        if (!childElement) return;
        const childHtmlElement = this._vDomPrototypeElementToHtmlElement(
          childElement,
          htmlElement,
        );
        if (childHtmlElement !== htmlElement) {
          htmlElement.appendChild(childHtmlElement);
        }
      });
    }

    return htmlElement;
  }
}
