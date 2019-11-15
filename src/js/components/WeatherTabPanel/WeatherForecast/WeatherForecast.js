import Component from '../../../framework/Component';
import { WeatherForecastItem } from './WeatherForecastItem';
import weatherDataService from '../../../services/WeatherDataService';
import AppState from '../../../services/AppState';
import { registerComponent } from '../../../utils/ProxyClass';
import { LIST_LOC_EVENT, UNITS_CHANGE_EVENT } from '../../../utils/const';
import {
  TEMP_SYS,
  timeToOpenWeatherTime,
  getWeatherByDay,
  getCurrentDayIndex,
} from '../../../utils/utils';

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);
    this.preSelectedDayItem = null;
    this.fiveDayForecast = null;
  }

  init() {
    this.initState({ weekForecast: [] });
    this.weatherItems = [];
    this.units = TEMP_SYS.METRIC;
    AppState.watch(LIST_LOC_EVENT, this.getWeather.bind(this));
    AppState.watch(UNITS_CHANGE_EVENT, this.unitsChanged.bind(this));

    // Subscribes for 5 days weather forecast
    this.onForecastServerResponse = this.onForecastServerResponse.bind(this);
    weatherDataService.subscribeForWeatherForecast(this.onForecastServerResponse);

    // Subscribes for current weather forecast
    this.onCurrentServerResponse = this.onCurrentServerResponse.bind(this);
    weatherDataService.subscribeForCurrentWeather(this.onCurrentServerResponse);
  }

  unitsChanged(newUnits) {
    this.units = newUnits;
  }

  onCurrentServerResponse(currentWeather) {
    const currentDate = new Date();
    const openWeatherCurrentTime = timeToOpenWeatherTime(currentDate);
    const currentDayWeather = this.fiveDayForecast.get(getCurrentDayIndex());

    if (currentDayWeather) {
      const currentTimeWeather = { ...currentWeather, dt_txt: currentDate.toUTCString() };
      // put current time weather instead current time from week forecast
      currentDayWeather[openWeatherCurrentTime] = currentTimeWeather;
    }
    this.setState({
      weekForecast: this.buildForecastItemList(),
    });
  }

  onForecastServerResponse(weatherData) {
    this.fiveDayForecast = getWeatherByDay(weatherData);
  }

  async getWeather(location = null) {
    weatherDataService.getWeather(location);
  }

  beforeRender() {
    super.beforeRender();
  }

  buildForecastItemList() {
    const currentTime = timeToOpenWeatherTime(new Date());

    let _weekForecast = [];
    for (let [day, weather] of this.fiveDayForecast) {
      _weekForecast.push(
        this.buildForecastItem(
          getCurrentDayIndex() === day,
          currentTime,
          weather,
          this.weatherItems.length,
        ),
      );
    }
    return _weekForecast.join('');
  }

  buildForecastItem(isCurrentDay, currentTime, dayWeather, id) {
    const itemRef = `weatherForecastItem${id}`;
    this[itemRef] = Component.createRef();
    this.weatherItems.push(this[itemRef]);

    if (isCurrentDay) this.currentDayItemRef = itemRef;
    return `
      <WeatherForecastItem ref="${itemRef}"
        onChangeStyle="${this.itemStyleChangeHandler}"
        classList="${isCurrentDay ? 'open' : ''}"
        data="${Component.createObject(dayWeather)}"
        time="${currentTime}"
        unit="${this.units}"
      />`;
  }

  itemStyleChangeHandler(selectedItemComp) {
    if (selectedItemComp == this.preSelectedDayItem) return;

    ['front', 'back', 'top', 'bottom'].forEach((face) => {
      if (this.preSelectedDayItem[face]) {
        this.preSelectedDayItem[face].classList.toggle('open');
      }
      if (selectedItemComp[face]) {
        selectedItemComp[face].classList.toggle('open');
      }
    });
    selectedItemComp.cube.parentNode.classList.toggle('open');
    this.preSelectedDayItem.cube.parentNode.classList.remove('open');
    this.preSelectedDayItem = selectedItemComp;
  }

  afterRender() {
    if (this.currentDayItemRef) {
      this.preSelectedDayItem = this[this.currentDayItemRef];
    }
  }

  render() {
    return `
      <section class="tab-content weather-forecast">
        ${this.state.weekForecast}
      </section>`;
  }
}

registerComponent(WeatherForecastItem);
