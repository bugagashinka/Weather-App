import Component from "../../framework/Component";
import { FavouriteLocations } from "../FavouriteLocations";
import { SearchHistory } from "../SearchHistory";
import { CurrentWeather } from "../CurrentWeather";
import { WeatherForecast } from "../WeatherForecast";
import { TabsPanel } from "../TabsPanel";
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

classMap(
  FavouriteLocations,
  SearchHistory,
  CurrentWeather,
  WeatherForecast,
  TabsPanel
);
