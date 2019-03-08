import Component from "../../framework/Component";
import WeatherForecastItem from "../WeatherForecastItem";
import WeatherDataService from "../../services/WeatherDataService";
import { classes } from "../../utils/ProxyClass";

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    // return "<div><WeatherForecastItem from='WeatherForecast'/></div>";
    const weatherForecast = WeatherDataService.getWeatherForecast();
    let arr = weatherForecast.map(itemForecast => {
      return `<div><WeatherForecastItem
      temperature='${itemForecast.main.temp}'
      humidity='${itemForecast.main.humidity}'
      wind='${itemForecast.wind.speed}'
      weekDay='Monday'
      pressure='${itemForecast.main.pressure}'
      unit='metrical;'
      /></div>`;
    });
    console.log(arr);
    return arr[0];
  }
}

classes["WeatherForecast"] = WeatherForecast;
