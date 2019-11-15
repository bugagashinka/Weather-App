import Component from '../../../../framework/Component';
import { registerComponent } from '../../../../utils/ProxyClass';
import { Temperature } from './Temperature';
import { MainWeather } from './MainWeather';
import weatherIcons from '../../../../../assets/data/icons.json';
import {
  Iterator,
  getDayNameById,
  getOrdinalNumberEnding,
} from '../../../../utils/utils';

const FIRST_LETTERS = 3;
const FRONT_FACE = 'front';
const BACK_FACE = 'back';
const TOP_FACE = 'top';
const BOTTOM_FACE = 'bottom';
const faces = [FRONT_FACE, BACK_FACE, TOP_FACE, BOTTOM_FACE];

export default class WeatherForecastItem extends Component {
  init() {
    this.initState(this.props);
    this.isCurrentDay = this.state.classList.indexOf('open');
    this.cube = null;
    this.faceStep = 0;
    this.timeCursor = Iterator(Object.keys(this.state.data), this.props.time, true);
    this.faceCount = 0;
    this.currentFace = FRONT_FACE;
  }

  initFacesRef() {
    this.front = null;
    this.back = null;
    this.top = null;
    this.bottom = null;
  }

  static getLocalTime(date) {
    return date
      .toLocaleTimeString()
      .split(':')
      .slice(0, 2)
      .join(':');
  }

  updateForecast(data) {
    this.setState(data);
  }

  /*   getCurrentWeather() {
    this.currentWeather;
  } */

  cubeClickHandler() {
    if (this[this.currentFace].classList.contains('open')) {
      if (this.timeCursor.length > faces.length) {
        this.faceCount -= 1;
      }
      if (this.faceCount === 0) {
        this.setState({ classList: 'open' });
        setTimeout(this.rotateCube.bind(this), 1);
        return;
      }
      this.rotateCube();
    } else {
      this.changeStyle(this, this[this.currentFace]);
    }
  }

  rotateCube() {
    this.faceStep += 1;
    if (this.faceStep >= faces.length) {
      this.faceStep = 0;
    }
    const newFace = faces[this.faceStep];

    if (!this[newFace]) {
      // if count of faces less than 4, skipped rotate logic and increment faceStep
      this.rotateCube();
      return;
    }

    this.cube.classList.remove(`show-${this.currentFace}`);
    this.cube.classList.add(`show-${newFace}`);
    this[this.currentFace].classList.toggle('visible');
    this[newFace].classList.toggle('visible');
    this.currentFace = newFace;
  }

  changeStyle(currentItemComp, currentItemNode) {
    // params will be resend to parent changeStyle listener
  }

  buildForecastItem() {
    this.initFacesRef();
    const res = faces
      .map((face) => {
        if (this.faceCount === this.timeCursor.length) return '';

        const time = this.timeCursor.next();

        const timeForecast = this.state.data[Number(time)];
        const forecastIcon = weatherIcons[timeForecast.weather[0].id];
        const date = new Date(timeForecast.dt_txt);
        this.faceCount += 1;
        this[face] = Component.createRef();
        return `
          <div
            class="cube__face cube__face--${face} forecast-item
            ${face === this.currentFace ? 'visible' : ''} 
            ${this.state.classList}"
            ref='${face}'>
              <div class="item item-detail">
                <span class="item item-day">
                  ${getDayNameById(date.getDay()).slice(0, FIRST_LETTERS)}
                  <span class="item-day-date">${date.getDate()}</span>
                  <sup class="item-day-ordinal">
                    ${getOrdinalNumberEnding(date.getDate())}
                  </sup>
                  <span class="item-day-time">
                    ${WeatherForecastItem.getLocalTime(date)}
                  </span>
                </span>
                <MainWeather 
                  windSpeed="${
                    timeForecast.wind.speed
                  }" mainData="${Component.createObject(timeForecast.main)}"
                  />
              </div>
              <div class="item-base">
                <div class="item-icon">
                  <i class="wi ${forecastIcon}" 
                    title="${forecastIcon.replace('wi-', '')}">
                  </i>
                </div>
                <Temperature value="${Math.round(parseFloat(timeForecast.main.temp))}"/>
              </div>
          </div>`;
      })
      .join('');
    return res;
  }

  render() {
    return `
      <div class="scene ${this.state.classList}">
        <div
          class="cube show-${this.currentFace}"
          ref2v="${(ref) => {
            this.cube = ref;
          }}"
          onClick="${this.cubeClickHandler}">
            ${this.buildForecastItem()}
        </div>
      </div>`;
  }
}
registerComponent(Temperature, MainWeather);
