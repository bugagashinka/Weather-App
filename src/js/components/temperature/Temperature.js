import Component from "../../framework/Component";

export default class Temperature extends Component {
  constructor(host, props) {
    super(host, props);
  }
  render() {
    return "<div>asdasd</div>";
    // return "Temperature " + this.props.temperature + "&deg;" + this.props.units;
    // return "<div class='temperature'></div>";
  }
}
