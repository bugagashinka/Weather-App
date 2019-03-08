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

class ProxyClass {
  // constructor(name, ...params) {
  //   console.log("$$$$$$$$$$$$$$ ", classes);
  //   return new classes[name](...params);
  // }

  createInstance(name, ...params) {
    console.log("$$$$$$$$$$$$$$ ", classes);
    return new classes[name](...params);
  }

  isClass(name) {
    return classes[name];
  }
}
export default new ProxyClass();
