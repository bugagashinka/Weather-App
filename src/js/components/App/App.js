import Component from '../../framework/Component';
import { Temperature } from '../Temperature';
import { SearchBar } from '../SearchBar';
import { CurrentWeather } from '../CurrentWeather';


export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        const temp1 = document.createElement('div');
        new Temperature(temp1, {temperature: 7, units: 'C'})

        return [
            'Some text', 
            temp1,
            {
                tag: Temperature,
                props: {
                    temperature: 100,
                    units: "F",
                }
            },
            {
                tag: SearchBar,
            },
            {
                tag: CurrentWeather,
                props: {
                    temperature: 12,
                    weekDay: 'Monday',
                    weatherIcon: '',
                    wind: '',
                    preassure: '',
                    humidity: '',
                }
            }
        ];
    }
}