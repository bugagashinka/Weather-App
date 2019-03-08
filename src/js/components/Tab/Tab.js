import Component from "../../framework/Component";
import { classes } from "../../utils/ProxyClass";

export default class Tab extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    console.log("afro", this.props.checked);
    return [
      `<input id="${this.props.id}" 
        class="tab-radio" 
        type="radio" 
        name="tabs" 
        ${this.props.checked === "checked" ? "checked='checked'" : ""}
        />`,
      `<label for="${this.props.id}"
        class="weather-tab fav-tab">${this.props.title}
        </label>`
    ];
  }
}
//

classes["Tab"] = Tab;
