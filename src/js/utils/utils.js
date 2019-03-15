const MINUTES = 60;
const HOUR_AND_HALF = 90;
const WEEK_DAYS = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};
const OPEN_WEATHER_TIME = [15, 18, 21, 0, 3, 6, 9, 12].map(
  time => time * MINUTES
);
let _weatherByDay = null;

const isString = value => {
  return typeof value === "string";
};

const getWeatherByDay = weatherArray => {
  if (!_weatherByDay) _weatherByDay = new Map();

  weatherArray.every(dayWeather => {
    const date = new Date(dayWeather.dt_txt);

    if (_weatherByDay.size > 4) return false;

    if (!_weatherByDay.get(date.getDay())) {
      _weatherByDay.set(date.getDay(), new Map());
    }
    _weatherByDay.get(date.getDay()).set(date.getHours(), dayWeather);
    return true;
  });
  return _weatherByDay;
};

const timeToOpenWeatherTime = date => {
  const currentTime = date.getHours() * MINUTES + date.getMinutes();
  const openWeatherTime = Math.min(
    ...OPEN_WEATHER_TIME.filter(
      time => currentTime <= time + HOUR_AND_HALF
      // && Math.abs(time - currentTime)
    )
  );
  return openWeatherTime / MINUTES;
};

const getDayNameById = dayId => {
  return WEEK_DAYS[dayId];
};

export { isString, getDayNameById, timeToOpenWeatherTime, getWeatherByDay };
