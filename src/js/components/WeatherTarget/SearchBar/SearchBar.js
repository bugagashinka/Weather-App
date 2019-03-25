import Component from "../../../framework/Component";

const ENTER_KEY = 13;
export default class SearchBar extends Component {
  constructor(host, props) {
    super(host, props);
  }

  keyPressHandler(e) {
    if (e.keyCode == ENTER_KEY) {
      console.log(`SEND REQUEST`);
      return;
    }
    console.log(e.target.value);
  }

  render() {
    return `<input 
        id="search-field" 
        type="text"
        onKeyPress='${this.keyPressHandler}'
        class="input-search" 
        placeholder="Search for city or coordinates" 
      />`;
  }
}
