import Component from '../../framework/Component';
import AppState from '../../services/AppState';
import { SearchBar, SEARCH_EVENT } from './SearchBar';
import { FavoriteLocation } from './FavoriteLocation';
import { CurrentLocation } from './CurrentLocation';
import ObjectStorage from '../../utils/ObjectStorage';
import ArrayStorage from '../../utils/ArrayStorage';
import { timeForLocationOffset } from '../../utils/utils';
import WeatherDataService from '../../services/WeatherDataService';
import nyc from '../../../assets/img/nyc,usa.jpg';
import { registerComponent } from '../../utils/ProxyClass';
import { STORAGE_SEARCH_LIST, STORAGE_FAV_LIST } from '../../utils/const';

export default class WeatherTarget extends Component {
  init() {
    this.targetWeatherSection = null;
    this.favLocationCheckbox = null;
    this.bodyNode = document.body;

    this.initState({
      currentLocation: null,
      time: null,
      currentCoord: `Lat: 1 Lon: 2`,
    });
    this.onServerResponse = this.onServerResponse.bind(this);
    WeatherDataService.subscribeForCurrentWeather(this.onServerResponse);
    WeatherDataService.getWeather();

    AppState.watch(SEARCH_EVENT, WeatherTarget.searchLocationUpdated.bind(WeatherTarget));
    AppState.watch(STORAGE_FAV_LIST, this.favListUpdated.bind(this));
  }

  static searchLocationUpdated(location = null) {
    WeatherDataService.getWeather(location);
  }

  static logSearchLocation(searchLocationName, currentCoord) {
    const location = {
      [searchLocationName]: {
        searchTime: new Date().getTime(),
        coord: currentCoord,
      },
    };
    ObjectStorage.addItem(STORAGE_SEARCH_LIST, location);
  }

  static normalizeCurrentLocation(currentLocation) {
    return currentLocation.replace(',', ':');
  }

  favoriteStatusChange(status) {
    const locationName = WeatherTarget.normalizeCurrentLocation(
      this.state.currentLocation,
    );
    if (status) {
      ArrayStorage.addItem(STORAGE_FAV_LIST, locationName);
      return;
    }
    ArrayStorage.removeItem(STORAGE_FAV_LIST, locationName);
  }

  onServerResponse(currentWeather) {
    const currentCoord = `Lat: ${currentWeather.coord.lat} Lon: ${currentWeather.coord.lon}`;
    const searchRes = {
      currentLocation: `${currentWeather.name}, ${currentWeather.sys.country}`,
      time: timeForLocationOffset(currentWeather.timezone).getTime(),
      currentCoord,
    };
    this.setState(searchRes);
    WeatherTarget.logSearchLocation(searchRes.currentLocation, currentCoord);
  }

  favListUpdated(data) {
    if (
      !data.includes(WeatherTarget.normalizeCurrentLocation(this.state.currentLocation))
    ) {
      this.favLocationCheckbox.uncheck();
    }
  }

  afterRender() {
    this.bodyNode.addEventListener('mousemove', (e) => {
      const moveX = (e.pageX * -1) / 25;
      const moveY = (e.pageY * -1) / 25;
      this.targetWeatherSection.style.backgroundPosition = `${moveX}px ${moveY}px`;
    });
    window.initAutocomplete((place) => {
      AppState.update(SEARCH_EVENT, place);
    });
  }

  clear() {
    AppState.unwatch(SEARCH_EVENT, WeatherTarget.searchLocationUpdated);
    AppState.unwatch(STORAGE_FAV_LIST, this.favListUpdated);
  }

  render() {
    super.render();

    const currentLocation = `
      <CurrentLocation
        location="${this.state.currentLocation}" 
        time="${this.state.time}" 
        coord="${this.state.currentCoord}"
      />`;

    return `
      <section 
        ref2v='${(ref) => {
          this.targetWeatherSection = ref;
        }}'
        class="weather-target" 
        style="background-image: url(${nyc});">
          <SearchBar value='${
            this.state.currentLocation ? this.state.currentLocation : ''
          }'/>
          ${
            this.state.currentLocation
              ? `${currentLocation}
                  <FavoriteLocation
                    ref2v='${(ref) => {
                      this.favLocationCheckbox = ref;
                    }}'
                    checked='${ArrayStorage.isExist(
                      STORAGE_FAV_LIST,
                      WeatherTarget.normalizeCurrentLocation(this.state.currentLocation),
                    )}'
                    onChangeStatus='${this.favoriteStatusChange}'
                  />`
              : ''
          } 
      </section>`;
  }
}
registerComponent(SearchBar, FavoriteLocation, CurrentLocation);
