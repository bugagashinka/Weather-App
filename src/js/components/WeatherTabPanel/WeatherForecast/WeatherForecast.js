import Component from "../../../framework/Component";
import { WeatherForecastItem } from "./WeatherForecastItem";
import WeatherDataService from "../../../services/WeatherDataService";
import { classMap } from "../../../utils/ProxyClass";

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    let weatherForecast = WeatherDataService.getWeatherForecast();
    // weatherForecast
    //   .map(itemForecast => {
    //     return `<WeatherForecastItem
    //   temperature='${itemForecast.main.temp}'
    //   humidity='${itemForecast.main.humidity}'
    //   wind='${itemForecast.wind.speed}'
    //   weekDay='Monday'
    //   pressure='${itemForecast.main.pressure}'
    //   unit='metrical;'
    //   />`;
    //   })
    //   .slice(0)
    //   .forEach(weatherItem => {
    //     res += weatherItem;
    //   });
    weatherForecast = [1, 2, 3, 4, 5]
      .map(() => {
        return `<WeatherForecastItem
        temperature='9.37'
        humidity='72'
        wind='3'
        weekDay='Monday'
        pressure='1012.42'
        unit='metrical;'
      />`;
      })
      .join("");
    return `<section class="tab-content weather-forecast">
      ${weatherForecast}
    </section>`;
  }
}

classMap(WeatherForecastItem);
