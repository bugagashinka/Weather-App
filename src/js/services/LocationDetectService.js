const subsList = new Set();

class LocationDetectService {
  constructor() {
    this.request = null;
  }
  subscribeForLocationDetect(subscriber) {
    subsList.add(subscriber);
  }

  _getLocationByIp() {
    this.request = fetch(`http://geolocation-db.com/json/`)
      .then((res) => res.json())
      .then((data) => `${data.city},${data.country_code}`)
      .catch((error) => console.error(error));
    return this.request;
  }

  getCurrentLocation() {
    if (this.request) return this.request;
    // return this._getLocationByIp().then(this._notifyAll);
    return this._getLocationByIp();
  }

  _notifyAll(data) {
    subsList.forEach((listener) => listener(data));
    this.request = null;
    return data;
  }
}

export default new LocationDetectService();
