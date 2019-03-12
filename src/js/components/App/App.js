import Component from "../../framework/Component";
import { WeatherTarget } from "../WeatherTarget";
import { WeatherTabPanel } from "../WeatherTabPanel";
import { classMap } from "../../utils/ProxyClass";

export default class App extends Component {
  constructor(host) {
    super(host);
  }

  render() {
    return [
      '<div class="bg-image"></div>',
      {
        tag: WeatherTarget
      },
      "<WeatherTabPanel/>"
    ];
  }
}
classMap(WeatherTarget, WeatherTabPanel);
