import Component from "../../framework/Component";
import { Temperature } from "../Temperature";
import { SearchBar } from "../SearchBar";
import { CurrentWeather } from "../CurrentWeather";
import { WeatherForecast } from "../WeatherForecast";

export default class App extends Component {
  constructor(host) {
    super(host);
  }

  render() {
    // return ["<div><WeatherForecast /></div", "<div><WeatherForecast /></div"];
    return ["<div><section></section></div>"];
  }
}
