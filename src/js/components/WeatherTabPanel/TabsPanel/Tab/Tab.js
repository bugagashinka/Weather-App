import Component from '../../../../framework/Component';

export default class Tab extends Component {
  render() {
    return [
      `<input id="${this.props.id}" 
        class="tab-radio" 
        type="radio" 
        name="tab" 
        ${this.props.checked === 'checked' ? "checked='checked'" : ''}
      />`,
      `<i class="${this.props.class} tab-icon"></i>`,
      `<label for="${this.props.id}"
        class="weather-tab 
        ${this.props.id}">${this.props.title}
      </label>`,
    ];
  }
}
