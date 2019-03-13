import ProxyClass from "../utils/ProxyClass";
import { isString } from "../utils/utils";

const PARSE_XML = "text/xml";
const TEXT_NODE = "#text";
const TAG_SPAN = "span";
const DOM_PARSER = new DOMParser();

const getElementAttr = htmlElement => {
  return Array.from(htmlElement.attributes).map((attr, index) => {
    return {
      name: htmlElement.attributes[index].nodeName,
      value: htmlElement.attributes[index].value
    };
  });
};

//Convert dom nodes to object literals (proto)
const htmlElementToVirtualDomPrototype = htmlElement => {
  if (htmlElement.nodeName === TEXT_NODE) {
    if (!htmlElement.data.trim().length) return null;
    return { tag: TAG_SPAN, content: htmlElement.data, children: [] };
  } else {
    return {
      tag: `${htmlElement.nodeName}`,
      attributes: getElementAttr(htmlElement),
      children: htmlElement.childNodes.length
        ? Array.from(htmlElement.childNodes).map(
            htmlElementToVirtualDomPrototype
          )
        : []
    };
  }
};

// Parse html element from string into dom nodes
const parseHTMLString = content => {
  return DOM_PARSER.parseFromString(content, PARSE_XML).firstChild;
};

const attrToPropsFormat = attrs => {
  return attrs && attrs.length
    ? attrs.reduce((props, attr) => {
        props[attr.name] = attr.value;
        return props;
      }, {})
    : {};
};

export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.beforeRender();
    this._render();
    this.afterRender();
  }

  _render() {
    // this.host.innerHTML = "";
    let content = this.render();

    if (isString(content)) {
      content = [content];
    }

    content
      .map(contentItem => {
        return isString(contentItem)
          ? htmlElementToVirtualDomPrototype(parseHTMLString(contentItem))
          : contentItem;
      })
      .map(prototypeItem =>
        this._vDomPrototypeElementToHtmlElement(prototypeItem)
      )
      .forEach(htmlElement => {
        this.host.appendChild(htmlElement);
      });
  }

  beforeRender() {}

  afterRender() {}

  setState(newState) {
    console.log("Component | setState |", this.state);
    if (!this.state) {
      throw `${this.constructor.name} component doesn't have state yet`;
    }
    this.state = Object.assign({}, this.state, newState);
    console.log("Component | setState | before call rerender");
    this._render();
  }

  /* @returns {string|[string|HTMLElement|Component]} */
  render() {
    return "OMG! They wanna see me!!!!!! Aaaaaa";
  }

  _vDomPrototypeElementToHtmlElement(
    protoElement,
    parent = document.createDocumentFragment()
  ) {
    if (ProxyClass.isClass(protoElement.tag) && parent) {
      //It's component
      const props = attrToPropsFormat(protoElement.attributes);
      ProxyClass.createInstance(protoElement.tag, parent, props);
      return parent;
    }
    //It's not component
    const htmlElement = document.createElement(protoElement.tag);
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
