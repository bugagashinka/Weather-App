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
    return { tag: TAG_SPAN, content: htmlElement.data };
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
  return attrs.length
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
    this._render();
  }

  _render() {
    // this.host.innerHTML = "";
    let content = this.render();

    if (isString(content)) {
      content = [content];
    }

    content
      .map(contentItem => {
        if (isString(contentItem)) {
          return htmlElementToVirtualDomPrototype(parseHTMLString(contentItem));
        }
      })
      .map(prototypeItem =>
        this._vDomPrototypeElementToHtmlElement(prototypeItem)
      )
      .forEach(htmlElement => {
        this.host.appendChild(htmlElement);
      });
  }

  /* @returns {string|[string|HTMLElement|Component]} */
  render() {
    return "OMG! They wanna see me!!!!!! Aaaaaa";
  }

  _vDomPrototypeElementToHtmlElement(
    element,
    parent = document.createDocumentFragment()
  ) {
    // if (element.tag) {
    if (ProxyClass.isClass(element.tag) && parent) {
      //It's component
      const props = attrToPropsFormat(element.attributes);
      ProxyClass.createInstance(element.tag, parent, props);
      return parent;
    }
    //It's not component
    const container = document.createElement(element.tag);
    if (element.content) {
      container.innerHTML = element.content;
    }

    // ensure following element properties are Array
    ["classList", "attributes", "children"].forEach(item => {
      if (element[item] && !Array.isArray(element[item])) {
        element[item] = [element[item]];
      }
    });

    if (element.classList) {
      container.classList.add(...element.classList);
    }

    if (element.attributes) {
      element.attributes.forEach(attributeSpec => {
        container.setAttribute(attributeSpec.name, attributeSpec.value);
      });
    }

    // process children
    if (element.children) {
      element.children.forEach(el => {
        if (!el) return;
        const htmlElement = this._vDomPrototypeElementToHtmlElement(
          el,
          container
        );
        if (htmlElement !== container) {
          container.appendChild(htmlElement);
        }
      });
    }

    return container;
  }
  // return element;
  // }
}
