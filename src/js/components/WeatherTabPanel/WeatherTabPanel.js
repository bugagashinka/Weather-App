import Component from '../../framework/Component';
import { TabsPanel } from './TabsPanel';
import { WeatherForecast } from './WeatherForecast';
import { FavoriteList } from './FavoriteList';
import { SearchHistory } from './SearchHistory';
import { registerComponent } from '../../utils/ProxyClass';

export default class WeatherTabPanel extends Component {
  render() {
    super.render();
    return `
     <section class="weather">
       <TabsPanel/>
       <WeatherForecast/>
       <SearchHistory classList="tab-content search-list"/>
       <FavoriteList classList="tab-content weather-favorite"/>
     </section>`;
  }
}

registerComponent(FavoriteList, SearchHistory, WeatherForecast, TabsPanel);
