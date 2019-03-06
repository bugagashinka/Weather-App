import Component from '../../framework/Component';

export default class SearchBar extends Component {
    constructor(host, props) {
        super(host, props);
    }

    render() {
        return '<input type="text" class="input-search" placeholder="Search for city or coordinates" />';
    }
}