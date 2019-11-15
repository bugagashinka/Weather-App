import Component from '../../../../framework/Component';

export default class CurrentWeather extends Component {
  render() {
    return `<div class="forecast-item open">
        <div class="item-detail">
          <span class="item-day">${this.props.weekDay}<sup>th</sup></span>
          <div class="detail-weather">
            <span>${Math.round(this.props.wind)}</span> / 
            <span>${Math.round(this.props.preassure)}</span> /
            <span>${Math.round(this.props.humidity)}</span>
          </div>
        </div>
        <div class="item-base">
          <div class="item-icon">
            <i class="wi ${this.props.weatherIcon}" 
              title="${this.props.weatherIcon}">
            </i>
          </div>
          <div>
            <span class="item-temp">${this.props.temperature}</span>
            <span class="item-unit">${this.props.unit}</span>
          </div>
        </div>
      </div>`;
  }
}
