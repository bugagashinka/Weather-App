# Weather forecast application

<img src="./demo.gif" style="display: block; margin: auto;" alt="App demonstration" width="579" height="434" />

## Description:

[DEMO](https://bugagashinka.github.io/Weather-App/)

The [Kottans](https://github.com/kottans) community [Weather App task](https://github.com/kottans/weather-app) implementation.

Inspired by design [WhereTO App](https://dribbble.com/shots/1081917-WhereTO-App).

## Installation:

Download or git clone [source code](https://github.com/bugagashinka/Weather-App).

Use the package manager [npm](https://www.npmjs.com/get-npm) to install.

```bash
npm install
```

## Usage:

```bash
npm run start
```

Ready on http://localhost:8080/

## Components functionality:

- **Render components**. <br/>
  Describe UI like HTML string and library instantiate components from parsed result.
  String interpolation allow integrate javascript expressions.

```js
  render() {
    return `
      <section class="tab-content weather-forecast">
        ${this.state.weekForecast}
      </section>`;
  }
```

- **Component lifecycle methods.**
  Each component has several “lifecycle methods” that you can override to run code at particular times in the process. These methods are called in the following order when an instance of a component is being created and inserted into the DOM.

```js
// ............... description in progress ...........
init();
beforeRender();
render();
afterRender();
clear();
```

- **Component state.**

```js
// ............... description in progress ...........

initState(); - add local state (private) to a component

init() {
    this.initState({
      speed: this.props.windSpeed,
      pressure: this.props.mainData.pressure,
      humidity: this.props.mainData.humidity,
    });
  }

setState();
```

- **Nested components.**

```js
  import { registerComponent } from './utils/ProxyClass';
  import { WeatherForecastItem } from './WeatherForecastItem';

  render() {
    return `
      <section class="forecast-item">
        <WeatherForecastItem/>
      </section>`
  }

  registerComponent(WeatherForecastItem);
```

- **Component props to customize component content.**

```js
render() {
  const weatherForecastItem = `
    <WeatherForecastItem
      classList="${isCurrentDay ? 'open' : ''}"
      data="${Component.createObject(dayWeather)}"
      time="${currentTime}"
      unit="${this.units}"
    />`;

    return `
      <section class="forecast-item">
        <WeatherForecastItem/>
      </section>`
}
```

- **Event handlers and propagations (bubbling).** <br/>
  Handlers name must start with 'on' prefix.

Event handler on the component

```js
  // Parent component code (WeatherForecast)
  itemStyleChangeHandler(selectedItemComp) {
    ...
  }

  render() {
    return `
      <WeatherForecastItem ref="${itemRef}"
        onChangeStyle="${this.itemStyleChangeHandler}"
      />`;
  }
```

Event handler on the plain html element. You should use standard DOM events.

```js

  //  Nested component code (WeatherForecastItem)
  render() {
    return `
      <div class="scene ${this.state.classList}">
        <div
          class="cube show-${this.currentFace}"
          onClick="${this.cubeClickHandler}">
            ${this.buildForecastItem()}
        </div>
      </div>`;
  }

  cubeClickHandler() {
    this.changeStyle(this, this[this.currentFace]);
  }

  // Must be declared in the component even with an empty implementation
  changeStyle(currentItemComp, currentItemNode) {
    // handle parent callback to propagate data (params) back to parent 'changeStyle' listener
  }
```

- **Global state.**

```js
import AppState from './AppState';

// Component A
{
  // Subsribes on 'unit change' event
  this.unitsChanged = this.unitsChanged.bind(this);
  AppState.watch(UNITS_CHANGE_EVENT, this.unitsChanged);
}

  clear() {
    AppState.unwatch(UNITS_CHANGE_EVENT, this.unitsChanged);
  }

// Component B
{
    // Triger 'unit change' event
    AppState.update(UNITS_CHANGE_EVENT, currentTemperatureSystem);
}
```

- **DOM element references.**

```js
  render() {
    const background = `
      <div
        ref2v="${(ref, comp) => {
          comp.backgroundImg = ref;
        }}"
        class="bg-image">
      </div>`;

    return [background, '<WeatherForecastWindow />'];
  }

  afterRender() {
      this.cube ...
  }
```

or

```js
  render() {
    const itemRef = `weatherForecastItem`;
    this[itemRef] = Component.createRef();

    const weatherForecastItem = `
      <WeatherForecastItem
        ref="${itemRef}"
      />`;

    return `
      <section class="forecast-item">
        ${weatherForecastItem}
      </section>`
  }

  afterRender() {
      this.weatherForecastItem ...
  }
```
