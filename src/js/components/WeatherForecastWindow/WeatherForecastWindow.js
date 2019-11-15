import Component from '../../framework/Component';
import { WeatherTarget } from '../WeatherTarget';
import { WeatherTabPanel } from '../WeatherTabPanel';
import { registerComponent } from '../../utils/ProxyClass';

export default class WeatherForecastWindow extends Component {
  render() {
    super.render();
    return `
      <div class='forecast-window'>
        <WeatherTarget />
        <WeatherTabPanel />
      </div>
    `;
  }
}

registerComponent(WeatherTarget, WeatherTabPanel);
