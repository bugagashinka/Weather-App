import Component from "../../framework/Component";
import { TabsPanel } from "./TabsPanel";
import { WeatherForecast } from "./WeatherForecast";
import { FavouriteLocations } from "./FavouriteLocations";
import { SearchHistory } from "./SearchHistory";
import { classMap } from "../../utils/ProxyClass";

export default class WeatherTabPanel extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return `<section class="weather">
      <TabsPanel/>
      <WeatherForecast/>
      <FavouriteLocations/>
      <SearchHistory/>
    </section>`;
  }
}

classMap(FavouriteLocations, SearchHistory, WeatherForecast, TabsPanel);
