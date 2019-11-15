import Component from '../../framework/Component';
import { WeatherTarget } from '../WeatherTarget';
import { WeatherTabPanel } from '../WeatherTabPanel';
import { registerComponent } from '../../utils/ProxyClass';
import { WeatherForecastWindow } from '../WeatherForecastWindow';
import nyc from '../../../assets/img/nyc,usa.jpg';

export default class App extends Component {
  init() {
    this.backgroundImg = null;
  }

  afterRender() {
    this.backgroundImg.style.backgroundImage = `url(${nyc})`;
  }

  render() {
    const background = `
      <div ref2v="${(ref) => {
        this.backgroundImg = ref;
      }}" class="bg-image">
      </div>`;

    return [background, '<WeatherForecastWindow />'];
  }
}
registerComponent(WeatherTarget, WeatherTabPanel, WeatherForecastWindow);
