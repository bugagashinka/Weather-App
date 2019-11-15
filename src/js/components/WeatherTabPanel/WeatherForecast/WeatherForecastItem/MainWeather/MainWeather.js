import Component from '../../../../../framework/Component';
import AppState from '../../../../../services/AppState';
import { UNITS_CHANGE_EVENT } from '../../../../../utils/const';
import { TEMP_SYS } from '../../../../../utils/utils';

const MPH_IN_MPS = 2.236936;

export default class MainWeather extends Component {
  constructor(host, props) {
    super(host, props);
  }
  init() {
    this.units = TEMP_SYS.METRIC;
    this.initState({
      speed: this.props.windSpeed,
      pressure: this.props.mainData.pressure,
      humidity: this.props.mainData.humidity,
    });
    this.unitsChanged = this.unitsChanged.bind(this);
    AppState.watch(UNITS_CHANGE_EVENT, this.unitsChanged);
  }

  unitsChanged(newUnits) {
    this.units = newUnits;
    this.setState({
      speed: this.calculateWindSpeed().toFixed(2),
    });
  }

  clear() {
    AppState.unwatch(UNITS_CHANGE_EVENT, this.unitsChanged);
  }

  calculateWindSpeed() {
    return this.units == TEMP_SYS.IMPERIAL
      ? this.state.speed * MPH_IN_MPS
      : this.state.speed / MPH_IN_MPS;
  }
  render() {
    return `
        <div class="item detail-weather">
          <span>
            ${this.state.speed} ${this.units == TEMP_SYS.METRIC ? 'mps' : 'mph'}
          </span> /
          <span>${this.state.pressure} hpa</span> /
          <span>${this.state.humidity} %</span>
        </div>`;
  }
}
