import Component from '../../../../../framework/Component';
import AppState from '../../../../../services/AppState';
import { UNITS_CHANGE_EVENT } from '../../../../../utils/const';
import {
  getTemperatureSystem,
  toggleTemperatureSystem,
  TEMP_SYS,
} from '../../../../../utils/utils';

const TEMP_DIFFERENT_NUMBER = 32;
const CELS_TO_FAHR_RATE = 180 / 100;
const FAHR_TO_CELS_RATE = 100 / 180;

class Temperature extends Component {
  init() {
    this.initState({
      temp:
        getTemperatureSystem() === TEMP_SYS.IMPERIAL
          ? Temperature.calculateTemp(this.props.value)
          : this.props.value,
    });
    this.unitsChanged = this.unitsChanged.bind(this);
    AppState.watch(UNITS_CHANGE_EVENT, this.unitsChanged);
  }

  static calculateTemp(value) {
    return Math.round(
      getTemperatureSystem() === TEMP_SYS.IMPERIAL
        ? Number(value) * CELS_TO_FAHR_RATE + TEMP_DIFFERENT_NUMBER
        : (Number(value) - TEMP_DIFFERENT_NUMBER) * FAHR_TO_CELS_RATE,
    );
  }

  unitsClickHandler(e) {
    toggleTemperatureSystem();
    e.stopPropagation();
  }

  unitsChanged() {
    this.setState({ temp: Temperature.calculateTemp(this.state.temp) });
  }

  clear() {
    AppState.unwatch(UNITS_CHANGE_EVENT, this.unitsChanged);
  }

  render() {
    const isMetricSystem = getTemperatureSystem() === TEMP_SYS.METRIC;
    return `
      <span class="item item-temp">
        ${this.state.temp}
        <sup class="item item-unit">${'&#176;'}</sup>
        <button 
          class="item-unit-control"
          onClick="${this.unitsClickHandler}">
          ${isMetricSystem ? 'C' : 'F'}  
        </button>
      </span>`;
  }
}

export { Temperature as default };
