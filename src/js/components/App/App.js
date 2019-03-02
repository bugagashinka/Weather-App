import Component from '../../framework/Component';
import {Temperature} from '../temperature';

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        const temp1 = document.createElement('div');
        new Temperature(temp1, {temperature: 7, units: 'C'})

        return ['Some text', temp1];
    }
}