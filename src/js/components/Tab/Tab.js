import Component from "../../framework/Component";
import { classes } from "../../utils/ProxyClass";

export default class Tab extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return [
      `<input id="${this.props.id}" 
        class="tab-radio" 
        type="radio" 
        name="tabs" />`,
      `<label for="${this.props.id}"
        class="weather-tab fav-tab">${this.props.title}
        </label>`
    ];
  }
}
//    ${this.props.checked === "true" ? " checked" : ""}

classes["Tab"] = Tab;
