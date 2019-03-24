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
const weatherItems = [];

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);
    this.state = {};
    this.preSelectedDayItem = null;

    this.onServerResponse = this.onServerResponse.bind(this);
    WeatherDataService.subscribeForCurrentWeather(this.onServerResponse);
    WeatherDataService.getWeatherForecast();
  }

  onServerResponse(weatherData) {
    let fiveDayForecast = getWeatherByDay(weatherData);
    weekForecast = this.buildForecastItemList(fiveDayForecast);
    this.setState({});
  }

  beforeRender() {
    console.log(`${this.constructor.name} | Before render `);
    // weekForecast = this.buildForecastItemList();
    // this.setState({});
  }

  afterRender() {}

  buildForecastItemList(fiveDayForecast) {
    const currentDate = new Date("2019-03-11 00:00:00"); //new Date();
    const currentTime = timeToOpenWeatherTime(currentDate);

    let _weekForecast = [];
    for (let [day, weather] of fiveDayForecast) {
      const dayWeather = weather.has(currentTime)
        ? weather.get(currentTime)
        : weather.values().next().value;

      const itemRef = `weatherForecastItem${weatherItems.length}`;
      this[itemRef] = Component.createRef();
      weatherItems.push(this[itemRef]);

      const isCurrentDay = currentDate.getDay() === day;
      if (isCurrentDay) this.currentDayItemRef = itemRef;

      _weekForecast.push(
        `<WeatherForecastItem ref='${itemRef}'
            onChangeStyle='${this.itemStyleChangeHandler}'
            classList='${isCurrentDay ? "open" : ""}'
            temperature='${parseInt(dayWeather.main.temp)}'
            humidity='${dayWeather.main.humidity}'
            wind='${dayWeather.wind.speed}'
            weekDay='${getDayNameById(new Date(dayWeather.dt_txt).getDay())}'
            pressure='${dayWeather.main.pressure}'
            unit='metrical;'
        />`
      );
    }
    return _weekForecast.slice(0).join("");
  }

  itemStyleChangeHandler(selectedItemComp, selectedItemNode) {
    if (selectedItemComp == this.preSelectedDayItem) return;
    Array.from(this.preSelectedDayItem.host.children).forEach(item => {
      if (item.classList.contains("open")) {
        item.classList.toggle("open");
      }
    });
    this.preSelectedDayItem = selectedItemComp;
    selectedItemNode.classList.toggle("open");
  }

  afterRender() {
    this.preSelectedDayItem = this[this.currentDayItemRef];
  }

  render() {
    return `<section class="tab-content weather-forecast">
      ${weekForecast}
    </section>`;
  }
}

classMap(WeatherForecastItem);
