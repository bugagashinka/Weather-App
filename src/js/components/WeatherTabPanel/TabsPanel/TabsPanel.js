import Component from "../../../framework/Component";
import { Tab } from "./Tab";
import { classMap } from "../../../utils/ProxyClass";

export default class TabsPanel extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return [
      '<Tab id="forecast-tab" title="Weather" checked="checked"/>',
      '<Tab id="history-tab" title="History"/>',
      '<Tab id="fav-tab" title="Favorites"/>'
    ];
  }
}

classMap(Tab);
