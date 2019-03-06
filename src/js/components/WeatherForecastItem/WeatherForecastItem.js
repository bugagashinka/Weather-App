import Component from '../../framework/Component';

export default class WeatherForecastItem extends Comment {
    constructor(host, props) {
        super(host, props);
    }

    render() {
        return `${this.props.temperature}`;
    }

}