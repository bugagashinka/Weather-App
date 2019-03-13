import Component from "../../../framework/Component";
import { WeatherForecastItem } from "./WeatherForecastItem";
import WeatherDataService from "../../../services/WeatherDataService";
import { classMap } from "../../../utils/ProxyClass";
import {
  getDayNameById,
  timeToOpenWeatherTime,
  getWeatherByDay
} from "../../../utils/utils.js";

let weekForecast = [];

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);
    this.state = {};
    this.onServerResponse = this.onServerResponse.bind(this);
    WeatherDataService.subscribeForCurrentWeather(this.onServerResponse);
    WeatherDataService.getWeatherForecast();
  }

  onServerResponse(weatherData) {
    let fiveDayForecast = getWeatherByDay(weatherData);
    weekForecast = this.buildForecastItems(fiveDayForecast);
    this.setState({});
  }

  beforeRender() {
    console.log(`${this.constructor.name} | Before render `);
    // weekForecast = this.buildForecastItems();
    // this.setState({});
  }

  buildForecastItems(fiveDayForecast) {
    const currentDate = new Date("2019-03-12 00:00:00"); //new Date();
    const currentTime = timeToOpenWeatherTime(currentDate);

    for (let [day, weather] of fiveDayForecast) {
      const dayWeather = weather.has(currentTime)
        ? weather.get(currentTime)
        : weather.values().next().value;

      weekForecast.push(
        `<WeatherForecastItem
            classList='${currentDate.getDay() === day ? "open" : ""}'
            temperature='${parseInt(dayWeather.main.temp)}'
            humidity='${dayWeather.main.humidity}'
            wind='${dayWeather.wind.speed}'
            weekDay='${getDayNameById(new Date(dayWeather.dt_txt).getDay())}'
            pressure='${dayWeather.main.pressure}'
            unit='metrical;'
        />`
      );
    }
    return weekForecast.slice(0).join("");
  }

  render() {
    console.log(`render from ${this.constructor.name}`);
    //pre render
    // let fiveDayForecast = getWeatherByDay(
    //   WeatherDataService.getWeatherForecast()
    // );
    // const currentDate = new Date("2019-03-12 00:00:00"); //new Date();
    // const currentTime = timeToOpenWeatherTime(currentDate);

    // let weekForecast = [];
    // for (let [day, weather] of fiveDayForecast) {
    //   const dayWeather = weather.has(currentTime)
    //     ? weather.get(currentTime)
    //     : weather.values().next().value;
    //   console.log(currentDate.getDay() === day);
    //   weekForecast.push(
    //     `<WeatherForecastItem
    //         classList='${currentDate.getDay() === day ? "open" : ""}'
    //         temperature='${parseInt(dayWeather.main.temp)}'
    //         humidity='${dayWeather.main.humidity}'
    //         wind='${dayWeather.wind.speed}'
    //         weekDay='${getDayNameById(new Date(dayWeather.dt_txt).getDay())}'
    //         pressure='${dayWeather.main.pressure}'
    //         unit='metrical;'
    //     />`
    //   );
    // }
    // weekForecast = weekForecast.slice(0).join("");
    //

    return `<section class="tab-content weather-forecast">
      ${weekForecast}
    </section>`;
  }
}

classMap(WeatherForecastItem);
