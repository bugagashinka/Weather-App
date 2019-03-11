import Component from "../../../../framework/Component";

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return `<div class="forecast-item">
    <div class="item-detail">
      <span class="item-day">${this.props.weekDay}<sup>th</sup></span>
      <div class="detail-weather">
        <span>${this.props.wind}</span> / 
        <span>${this.props.pressure}</span> /
        <span>${this.props.humidity}</span>
      </div>
    </div>
    <div class="item-base">
      <div class="item-icon"><i class="wi wi-day-cloudy"></i></div>
      <div>
        <span class="item-temp">
          ${this.props.temperature}
          <span class="item-unit">°</span>
        </span>
      </div>
    </div>
  </div>`;
  }
}
