import LocationDetectService from './LocationDetectService';

const subsForWeatherForecast = new Set();
const subsForCurrentWeather = new Set();

const ENDPOINT = 'https://api.openweathermap.org/data/2.5';
const CURRENT_ENDPOINT = '/weather';
const FORECAST_ENDPOINT = '/forecast';
const API_KEY = '73852c63fb2ae78cedf33850c175df87';

class WeatherServices {
  constructor() {
    LocationDetectService.subscribeForLocationDetect(
      this.locationServiceResponse.bind(this),
    );
    this.targetLocation = null;
  }

  locationServiceResponse(location) {}

  subscribeForCurrentWeather(subscriber) {
    subsForCurrentWeather.add(subscriber);
  }

  subscribeForWeatherForecast(subscriber) {
    subsForWeatherForecast.add(subscriber);
  }

  async getCurrentWeather(location = null) {
    await this.requestWeather(CURRENT_ENDPOINT, location, subsForCurrentWeather);
  }

  async requestWeather(req, location, subscribers) {
    if (!location) {
      await this.getLocation().then((loc) => {
        location = { place: loc };
      });
    }
    const locationParam = location.place
      ? `q=${location.place}`
      : `lat=${location.lat}&lon=${location.lng}`;

    const endpoint = `${ENDPOINT}${req}?${locationParam}&units=metric&APPID=${API_KEY}`;
    await fetch(endpoint)
      .then((res) => {
        if (res.status !== 200) {
          throw Error(
            `Response with status: ${res.status}, content: ${JSON.stringify(res)}`,
          );
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        subscribers.forEach((listener) =>
          listener(req === FORECAST_ENDPOINT ? data.list : data),
        );
      })
      .catch((error) => console.error(error));
  }

  getLocation() {
    if (this.targetLocation) return this.targetLocation;

    return LocationDetectService.getCurrentLocation();
  }

  async getWeatherForecast(location = null) {
    await this.requestWeather(FORECAST_ENDPOINT, location, subsForWeatherForecast);
  }

  async getWeather(location) {
    await this.getWeatherForecast(location);
    await this.getCurrentWeather(location);
  }
}

export default new WeatherServices();
