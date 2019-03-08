// import Temperature from "../components/Temperature";
// import SearchBar from "../components/SearchBar";
// import CurrentWeather from "../components/CurrentWeather";
// import WeatherForecast from "../components/WeatherForecast";

export const classes = {
  //   Temperature,
  //   SearchBar,
  //   CurrentWeather,
  //   WeatherForecast
};

export class ProxyClass {
  constructor(name, ...params) {
    console.log("$$$$$$$$$$$$$$ ", classes);
    return new classes[name](...params);
  }
}
