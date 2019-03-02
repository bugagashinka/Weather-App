
import Component from '../../framework/Component';

export default class Temperature extends Component {
    constructor(host, props) {
        super(host, props);
    }
    render() {
        return "Temperature " + this.props.temperature + "&deg;" + this.props.units;
    }
}