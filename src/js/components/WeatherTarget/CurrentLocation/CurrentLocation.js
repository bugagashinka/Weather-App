import Component from '../../../framework/Component';
import { CurrentLocationTime } from './CurrentLocationTime';
import { registerComponent } from '../../../utils/ProxyClass';

export default class CurrentLocation extends Component {
  init() {
    this.initState(this.props);
  }

  render() {
    return `
     <div class="location">
       <div class="loc loc-icon">
         <i class="fas fa-map-marker-alt"></i>
       </div>
       <div class="loc loc-city">${this.state.location}</div>
       <CurrentLocationTime class="loc loc-date" timeValue="${this.state.time}"/>
     </div>`;
  }
}
registerComponent(CurrentLocationTime);
