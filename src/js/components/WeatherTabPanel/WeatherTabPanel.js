import Component from "../../framework/Component";
import "../FavouriteLocations";
import "../SearchHistory";
import "../CurrentWeather";
import "../WeatherForecast";
import "../TabsPanel";
import { classes } from "../../utils/ProxyClass";

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
    // return `<TabsPanel/>`;
  }
}

classes["WeatherTabPanel"] = WeatherTabPanel;
