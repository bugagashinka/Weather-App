import Component from "../../framework/Component";
import { classes } from "../../utils/ProxyClass";

export default class Temperature extends Component {
  constructor(host, props) {
    super(host, props);
  }
  render() {
    // return "Temperature " + this.props.temperature + "&deg;" + this.props.units;
    return "<div class='temperature'></div>";
  }
}

classes["Temperature"] = Temperature;
