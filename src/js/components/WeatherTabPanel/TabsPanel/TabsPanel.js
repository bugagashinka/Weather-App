import Component from '../../../framework/Component';
import { Tab } from './Tab';
import { registerComponent } from '../../../utils/ProxyClass';

export default class TabsPanel extends Component {
  render() {
    super.render();
    return [
      '<Tab id="forecast-tab" class="fas fa-sun" title="Weather" checked="checked"/>',
      '<Tab id="history-tab" class="fas fa-search-location" title="History"/>',
      '<Tab id="fav-tab" class="fas fa-star" title="Favorites"/>',
    ];
  }
}

registerComponent(Tab);
