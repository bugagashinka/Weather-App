import Component from "../../../../framework/Component";

const FIRST_LETTERS = 3;

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
    this.state = {};
  }

  beforeRender() {
    console.log(`${this.constructor.name} | Before render `);
    // this.setState({});
  }

  render() {
    console.log(`Render from ${this.constructor.name} `);
    const isCurrentDay = this.props.classList.indexOf("open");
    return `
    <div class='forecast-item ${this.props.classList}'>
      <div class="item-detail">
        <span class="item-day">${
          isCurrentDay == 0
            ? this.props.weekDay
            : this.props.weekDay.slice(0, FIRST_LETTERS)
        }<sup>th</sup></span>
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
            <sup class="item-unit">${"&#176;"}</sup>
          </span>
        </div>
      </div>
  </div>`;
  }
}
