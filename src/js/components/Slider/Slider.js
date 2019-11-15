import Component from '../../framework/Component';

export default class Slider extends Component {
  constructor(host, props) {
    super(host, props);
    this.isDown = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.defaultListContent = '';
  }

  mouseDownHandler(e) {
    const slider = e.currentTarget;
    slider.classList.add('active');
    this.startX = e.pageX - slider.offsetLeft;
    this.isDown = true;
    this.scrollLeft = slider.scrollLeft;
  }

  mouseLeaveHandler(e) {
    e.currentTarget.classList.remove('active');
    this.isDown = false;
  }

  mouseUpHandler(e) {
    e.currentTarget.classList.remove('active');
    this.isDown = false;
  }

  mouseMoveHandler(e) {
    if (!this.isDown) return;
    const slider = e.currentTarget;
    e.preventDefault();
    const xPos = e.pageX - slider.offsetLeft;
    const step = (xPos - this.startX) * 4;
    slider.scrollLeft = this.scrollLeft - step;
  }

  renderList() {
    return this.defaultListContent;
  }

  render() {
    return `
      <section 
        class="slider-list ${this.props.classList}"
        onMouseDown="${this.mouseDownHandler}"
        onMouseLeave="${this.mouseLeaveHandler}"
        onMouseUp="${this.mouseUpHandler}"
        onMouseMove="${this.mouseMoveHandler}">
        ${this.renderList()}
      </section>`;
  }
}
