import Component from "../../../framework/Component";

export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return `<section class="tab-content weather-history">Search history list</section>`;
  }
}
