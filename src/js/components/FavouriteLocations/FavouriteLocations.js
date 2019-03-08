import Component from "../../framework/Component";
import { classes } from "../../utils/ProxyClass";

export default class FavouriteLocations extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return `<section class="tab-content weather-favorite">Favorite targets</section>`;
  }
}

classes["FavouriteLocations"] = FavouriteLocations;
