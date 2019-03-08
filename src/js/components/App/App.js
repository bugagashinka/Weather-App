import Component from "../../framework/Component";
import "../Temperature";
import "../SearchBar";
import "../WeatherTabPanel";

export default class App extends Component {
  constructor(host) {
    super(host);
  }

  render() {
    return [
      '<div class="bg-image"></div>',
      `<section class="target">
        <SearchBar/>
        <div class="location">
          <span class="loc-city"></span>
          <span class="loc-coordinate"></span>
          <span class="loc-date"></span>
        </div>
      </section>`,
      "<WeatherTabPanel/>"
    ];
  }
}
