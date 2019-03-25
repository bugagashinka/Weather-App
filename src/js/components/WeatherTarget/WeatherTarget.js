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
            <div class="loc loc-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="loc loc-city">Florida, usa</div>
            <div class="loc loc-date">20:15 pm</div>
        </div>
        <button class="favorite-button">
          <i class="far fa-star"></i>
        </button>
      </section>`
    ];
  }
}
classMap(SearchBar);
