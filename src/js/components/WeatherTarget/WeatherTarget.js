import Component from "../../framework/Component";
import { SearchBar } from "./SearchBar";
import { classMap } from "../../utils/ProxyClass";

export default class WeatherTarget extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    console.log(`render from ${this.constructor.name}`);
    return [
      `<section class="weather-target">
          <SearchBar/>
          <div class="location">
            <span class="loc-city"></span>
            <span class="loc-coordinate"></span>
            <span class="loc-date"></span>
          </div>
      </section>`
    ];
  }
}
classMap(SearchBar);
