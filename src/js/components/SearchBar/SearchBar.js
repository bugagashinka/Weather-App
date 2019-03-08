import Component from "../../framework/Component";
import { classes } from "../../utils/ProxyClass";

export default class SearchBar extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return `<input type="text" class="input-search" placeholder="Search for city or coordinates" />`;
  }
}

classes["SearchBar"] = SearchBar;
