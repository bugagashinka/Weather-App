import ProxyClass from "../utils/ProxyClass";
import AppState from "../services/AppState";
import { isString } from "../utils/utils";

const PARSE_XML = "text/xml";
const TEXT_NODE = "#text";
const DOM_PARSER = new DOMParser();
const COMPONENT_MOUNTED_EVENT = "COMPONENT_MOUNTED";

let vDomTree = new Map();
let isReRender = false;
let rootComponent;

export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.init();
    this.beforeRender();
    this._render();
    this._afterRender();
  }

  init() {}

  beforeRender() {}

  _render() {
    let content = this.render();

    if (isString(content)) {
      content = [content];
    }

    if (!vDomTree.has(this)) {
      if (!vDomTree.size) {
        rootComponent = this.constructor.name;
      }
      vDomTree.set(this, { children: [] });
      AppState.watch(COMPONENT_MOUNTED_EVENT, this.afterRender.bind(this));
    }

    content
      .map(contentItem => {
        return isString(contentItem)
          ? this._htmlElementToVirtualDomPrototype(
              this._parseHTMLString(contentItem)
            )
          : contentItem;
      })
      .map(prototypeItem =>
        this._vDomPrototypeElementToHtmlElement(prototypeItem)
      )
      .forEach(htmlElement => {
        if (isReRender && vDomTree.get(this).componentNode) {
          const oldHtmlElementNode = vDomTree.get(this).componentNode;
          oldHtmlElementNode.replaceWith(htmlElement);
          vDomTree.get(this).componentNode = htmlElement;
        } else {
          vDomTree.get(this).componentNode = this.host.appendChild(htmlElement);
        }
      });
  }

  /* @returns {string|[string|HTMLElement|Component]} */
  render() {
    return "OMG! They wanna see me!!!!!! Aaaaaa";
  }

  //notify all components, when first/root component rendered and attached to the document
  _afterRender() {
    if (this.constructor.name === rootComponent) {
      AppState.update(COMPONENT_MOUNTED_EVENT);
    }
  }

  afterRender() {}

  setState(newState) {
    if (!this.state) {
      throw new Error(
        `${this.constructor.name} component doesn't have state yet`
      );
    }
    this.state = Object.assign({}, this.state, newState);
    console.log("Component | setState | before call rerender");
    vDomTree.get(this).children.forEach(childComp => {
      vDomTree.delete(childComp);
    });
    isReRender = !isReRender;
    this._render();
    isReRender = !isReRender;
  }

  static createObject(plainObject) {
    return "object" + JSON.stringify(plainObject).replace(/"/g, "&quot;");
  }

  // This wheel use only for impose explicit property creation in component
  static createRef() {
    //return Declared (sub)Component with ref-property, as a value for parent component property created with 'createRef'
    return function _createRef(subComponent) {
      return subComponent;
    };
  }

  _checkRefProp(props, childComp) {
    //'this' - it's parent component
    if (!props.ref) return;

    if (
      typeof this[props.ref] != "function" &&
      this[props.ref].name != "_createRef"
    ) {
      throw new Error("Use Component.createRef for create property");
    }
    this[props.ref] = this[props.ref](childComp);
  }

  //Convert dom nodes to object literals (proto)
  _htmlElementToVirtualDomPrototype(htmlElement) {
    if (htmlElement.nodeName === TEXT_NODE) {
      if (!htmlElement.data.trim().length) return null;
      return { tag: TEXT_NODE, content: htmlElement.data.trim(), children: [] };
    } else {
      const elementAttrs = this._getElementAttr(htmlElement);
      return {
        tag: `${htmlElement.nodeName}`,
        attributes: elementAttrs.filter(({ name }) => !name.startsWith("on")),
        eventHandlers: elementAttrs.reduce((handlers, { name, value }) => {
          if (name.startsWith("on")) {
            handlers[name.slice(2)] = value;
          }
          return handlers;
        }, {}),
        children: htmlElement.childNodes.length
          ? Array.from(htmlElement.childNodes).map(
              this._htmlElementToVirtualDomPrototype.bind(this)
            )
          : []
      };
    }
  }

  _getElementAttr(htmlElement) {
    return Array.from(htmlElement.attributes).map((attr, index) => {
      return {
        name: htmlElement.attributes[index].nodeName,
        value: htmlElement.attributes[index].value
      };
    });
  }

  _removeComment(content) {
    return content.replace(/(\/\*[^*]*\*\/)|(\/\/[^*\n\r]*)[\n\r]/g, "").trim();
  }

  // Parse html element from string into dom nodes
  _parseHTMLString(content) {
    return DOM_PARSER.parseFromString(this._removeComment(content), PARSE_XML)
      .firstChild;
  }

  _attrToPropsFormat(attrs) {
    return attrs && attrs.length
      ? attrs.reduce((props, attr) => {
          props[attr.name] = attr.value.startsWith("object")
            ? JSON.parse(attr.value.replace("object", ""))
            : attr.value;
          return props;
        }, {})
      : {};
  }

  _vDomPrototypeElementToHtmlElement(
    protoElement,
    parent = document.createDocumentFragment()
  ) {
    if (ProxyClass.isClass(protoElement.tag)) {
      //It's a component
      return this._componentElementToHTML(protoElement, parent);
    }
    //It's not a component
    return this._plainElementToHTML(protoElement, parent);
  }

  _componentElementToHTML(protoElement, parent) {
    const props = this._attrToPropsFormat(protoElement.attributes);
    const comp = ProxyClass.createInstance(protoElement.tag, parent, props);

    if (protoElement.eventHandlers) {
      Object.keys(protoElement.eventHandlers).forEach(innerHandlerName => {
        const outerHandlerName = new Function(
          `return ${protoElement.eventHandlers[innerHandlerName]}`
        )().name;
        innerHandlerName =
          innerHandlerName.charAt(0).toLowerCase() + innerHandlerName.slice(1);
        if (typeof comp[innerHandlerName] !== "function")
          throw new Error(
            `${
              comp.constructor.name
            } component doesn't have a ${innerHandlerName} method`
          );
        const that = this;
        comp[innerHandlerName] = new Proxy(comp[innerHandlerName].bind(comp), {
          apply(innerHandler, context, args) {
            that[outerHandlerName].bind(that)(...args);
            return innerHandler.apply(context, args);
          }
        });
      });
    }

    vDomTree.get(this).children.push(comp);
    this._checkRefProp(props, comp);
    return parent;
  }

  _plainElementToHTML(protoElement, parent) {
    const htmlElement =
      protoElement.tag == TEXT_NODE
        ? document.createTextNode(protoElement.content)
        : document.createElement(protoElement.tag);

    if (protoElement.content) {
      htmlElement.innerHTML = protoElement.content;
    }

    // ensure following element properties are Array
    ["classList", "attributes", "children"].forEach(item => {
      if (protoElement[item] && !Array.isArray(protoElement[item])) {
        protoElement[item] = [protoElement[item]];
      }
    });

    if (protoElement.classList) {
      htmlElement.classList.add(...protoElement.classList);
    }

    if (protoElement.attributes) {
      protoElement.attributes.forEach(attributeSpec => {
        htmlElement.setAttribute(attributeSpec.name, attributeSpec.value);
      });
    }

    if (protoElement.eventHandlers) {
      Object.keys(protoElement.eventHandlers).forEach(eventType => {
        const handlerName = new Function(
          `return ${protoElement.eventHandlers[eventType]}`
        )().name;
        htmlElement.addEventListener(
          eventType.toLowerCase(),
          this[handlerName].bind(this)
        );
      });
    }

    // process children
    if (protoElement.children) {
      protoElement.children.forEach(childElement => {
        if (!childElement) return;
        const childHtmlElement = this._vDomPrototypeElementToHtmlElement(
          childElement,
          htmlElement
        );
        if (childHtmlElement !== htmlElement) {
          htmlElement.appendChild(childHtmlElement);
        }
      });
    }
    return htmlElement;
  }
}
