import Component from "../../framework/Component";
import { classes } from "../../utils/ProxyClass";

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return `<div fromProps='${this.props.temperature}'></div>`;
    // `${this.props.temperature}`;
  }
}

classes["WeatherForecastItem"] = WeatherForecastItem;
