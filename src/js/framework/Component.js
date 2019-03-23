import ProxyClass from "../utils/ProxyClass";
import { isString } from "../utils/utils";

const PARSE_XML = "text/xml";
const TEXT_NODE = "#text";
const DOM_PARSER = new DOMParser();

let isReRender = false;
let vDomTree = new Map();

export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.init();
    this.beforeRender();
    this._render();
    this.afterRender();
  }

  init() {}

  beforeRender() {}

  _render() {
    let content = this.render();

    if (isString(content)) {
      content = [content];
    }

    if (!vDomTree.has(this)) {
      vDomTree.set(this, { children: [] });
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

  afterRender() {}

  setState(newState) {
    console.log("Component | setState |", this.state);
    if (!this.state) {
      throw new Error(
        `${this.constructor.name} component doesn't have state yet`
      );
    }
    this.state = Object.assign({}, this.state, newState);
    console.log(this.state);
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
            handlers[name.toLowerCase().slice(2)] = value;
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

  // Parse html element from string into dom nodes
  _parseHTMLString(content) {
    return DOM_PARSER.parseFromString(content.trim(), PARSE_XML).firstChild;
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

    //for manual prototype declaration in component with classList key
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
        htmlElement.addEventListener(eventType, this[handlerName].bind(this));
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
