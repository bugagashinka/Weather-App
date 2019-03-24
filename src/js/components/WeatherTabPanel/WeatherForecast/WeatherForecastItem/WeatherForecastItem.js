import Component from "../../../../framework/Component";

const FIRST_LETTERS = 3;

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }

  init() {
    this.state = Object.assign({}, this.props);
    this.isCurrentDay = this.state.classList.indexOf("open");
  }

  beforeRender() {
    console.log(`${this.constructor.name} | Before render `);
    // this.props.classList;
  }

  updateForecast(data) {
    console.log(data);
    this.props.temperature = 1;
    this.setState(data);
  }

  getCurrentWeather() {
    this.currentWeather;
  }

  // target.classList.toggle("open");

  // console.log(e.currentTarget);
  // this.isCurrentDay.classList.remove("open");
  // this.isCurrentDay = e.currentTarget;
  // e.currentTarget.classList.toggle("open");
  clickHandler(e) {
    console.log("CLICK HANDLER WEATHERFORECASTITEM");
    debugger;
    this.changeStyle();
  }

  changeStyle() {
    console.log("changeStyle WEATHERFORECASTITEM");
  }

  render() {
    console.log(`Render from ${this.constructor.name} `);
    return `
    <div class='forecast-item ${this.state.classList}' 
      onClick='${this.clickHandler}'>
      <div class="item-detail">
        <span class="item-day">${
          this.isCurrentDay == 0
            ? this.state.weekDay
            : this.state.weekDay.slice(0, FIRST_LETTERS)
        }<sup>th</sup></span>
        <div class="detail-weather">
          <span>${this.state.wind}</span> / 
          <span>${this.state.pressure}</span> /
          <span>${this.state.humidity}</span>
        </div>
      </div>
      <div class="item-base">
        <div class="item-icon"><i class="wi wi-day-cloudy"></i></div>
        <div>
          <span class="item-temp">
            ${this.state.temperature}
            <sup class="item-unit">${"&#176;"}</sup>
          </span>
        </div>
      </div>
  </div>`;
  }
}
