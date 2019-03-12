import Component from "../../framework/Component";
import { SearchBar } from "./SearchBar";
import { classMap } from "../../utils/ProxyClass";

export default class WeatherTarget extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
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
    return [
      {
        tag: "section",
        classList: ["weather-target"],
        children: [
          { tag: SearchBar },
          {
            tag: "div",
            classList: ["location"],
            children: [
              {
                tag: "span",
                classList: ["loc-city"]
              },
              {
                tag: "span",
                classList: ["loc-coordinate"]
              },
              {
                tag: "span",
                classList: ["loc-date"]
              }
            ]
          }
        ]
      }
    ];
  }
}
classMap(SearchBar);
