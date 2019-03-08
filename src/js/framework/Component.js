import { ProxyClass } from "../utils/ProxyClass";

const PARSE_XML = "text/xml";

const getElementAttr = element => {
  const attrs = [];
  console.log(element);
  console.log(element.attributes);
  for (let key = 0; key < element.attributes.length; key++) {
    attrs.push({
      name: element.attributes[key].nodeName,
      value: element.attributes[key].value
    });
    console.log(
      element.attributes[key].nodeName,
      element.attributes[key].value
    );
  }
  console.log(attrs);
  return attrs;
};

//Convert markup to object literals
const htmlElementToVirtualDomPrototype = (htmlElement, flag = false) => {
  const elementProto = {
    tag: `${htmlElement.nodeName}`,
    attributes: getElementAttr(htmlElement),
    children: flag
      ? Array.from(htmlElement.childNodes).map(htmlElementToVirtualDomPrototype)
      : []
  };
  return elementProto;
};

const parseHTMLString = content => {
  // Parse html element in string
  const parser = new DOMParser();
  console.log("Content ", content);
  let element = parser.parseFromString(content, PARSE_XML).firstChild;
  console.log(element);
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
    console.log("====", ProxyClass);
    this.host.innerHTML = "";
    let content = this.render();

    if (typeof content === "string") {
      content = [content];
    }

    const prototypeElements = content.map(item => {
      if (typeof item === "string") {
        let domNodes = parseHTMLString(content);
        console.log("!!!", domNodes);
        return htmlElementToVirtualDomPrototype(
          domNodes,
          domNodes.childNodes.length
        );
      }
    });
    console.log(prototypeElements);

    prototypeElements
      .map(item => this._vDomPrototypeElementToHtmlElement(item, null)) // [string|HTMLElement] => [HTMLElement]
      .forEach(htmlElement => {
        this.host.appendChild(htmlElement);
      });
  }
  /* @returns {string|[string|HTMLElement|Component]} */
  render() {
    return "OMG! They wanna see me!!!!!! Aaaaaa";
  }

  /**
   *
   * @param {string|HTMLElement|Object} element
   * @private
   */
  _vDomPrototypeElementToHtmlElement(element, parent = null) {
    if (element.tag) {
      if (parent) {
        try {
          console.log(element.tag);
          const props = attrToPropsFormat(element.attributes);
          new ProxyClass(element.tag, parent, props);
        } catch (err) {
          console.log(err, "for tag", element.tag);
        }
        // if (typeof element.tag === "function") {
        //   const container = document.createElement("div");
        //   new element.tag(container, element.props);
        // return container;
        return parent;
      } else {
        // string
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
            const htmlElement = this._vDomPrototypeElementToHtmlElement(
              el,
              container
            );
            console.log("!!!!!!!htmlElement!!!!!!!!", htmlElement);
            console.log("!!!!!!!container!!!!!!!!", container);
            // container.appendChild(htmlElement);
          });
        }

        return container;
      }
    }
    return element;
  }
}
