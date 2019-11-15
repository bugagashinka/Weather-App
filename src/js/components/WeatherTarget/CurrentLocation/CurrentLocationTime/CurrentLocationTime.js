import Component from '../../../../framework/Component';

const ONE_SECOND = 1000;

export default class CurrentLocationTime extends Component {
  init() {
    this.initState({
      time: new Date(Number(this.props.timeValue)),
    });
  }

  tick() {
    const currentTime = this.state.time;
    currentTime.setSeconds(currentTime.getSeconds() + 1);
    this.setState({
      time: currentTime,
    });
  }

  render() {
    return `<div class="loc loc-date">${this.state.time.toLocaleTimeString()}</div>`;
  }

  afterRender() {
    this.timerId = setInterval(() => this.tick(), ONE_SECOND);
  }

  beforeRender() {
    clearInterval(this.timerId);
  }
}
