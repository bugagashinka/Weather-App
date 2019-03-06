import Component from '../../framework/Component';

export default class CurrentWeather extends Component {
    constructor(host, props) {
        super(host, props);
    }

    render() {
        return `<WeatherForecastItem 
            class="open" 
            temperature="${this.props.temperature}", 
            weekDay="${this.props.weekDay}"
            weatherIcon="${this.props.weatherIcon}",
            wind="${this.props.wind}",
            preassure="${this.props.preassure}",
            humidity="${this.props.humidity}",
        />`;
    }
}