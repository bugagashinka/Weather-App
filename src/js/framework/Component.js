import ProxyClass from "../utils/ProxyClass";

const PARSE_XML = "text/xml";
const TEXT_NODE = "#text";

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
    return { tag: "span", content: htmlElement.data };
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

const parseHTMLString = content => {
  // Parse html element from string
  const parser = new DOMParser();
  let element = parser.parseFromString(content, PARSE_XML).firstChild;
  return element;
};

const attrToPropsFormat = attrs => {
  const props = {};
  attrs.forEach(attr => {
    props[attr.name] = attr.value;
  });
  return props;
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

    if (typeof content === "string") {
      content = [content];
    }

    const prototypeElements = content.map(contentItem => {
      if (typeof contentItem === "string") {
        let domNodes = parseHTMLString(contentItem);
        return htmlElementToVirtualDomPrototype(domNodes);
      }
    });

    prototypeElements
      .map(item => this._vDomPrototypeElementToHtmlElement(item)) // [string|HTMLElement] => [HTMLElement]
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
    if (element.tag) {
      if (ProxyClass.isClass(element.tag) && parent) {
        console.log("It's component");
        const props = attrToPropsFormat(element.attributes);
        new ProxyClass.createInstance(element.tag, parent, props);
        return parent;
      }
      // string
      console.log("It's not component");
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
        console.log("!!!", element, element.children);
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
    return element;
  }
}
