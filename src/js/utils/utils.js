import AppState from '../services/AppState';
import { UNITS_CHANGE_EVENT } from './const';

const MINUTES = 60;
const HOUR_AND_HALF = 90;
const WEEK_DAYS = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};
const FORECAST_DAYS_COUNT = 5;

const openWeatherTimeline = [15, 18, 21, 0, 3, 6, 9, 12].map((time) => time * MINUTES);
let weatherByDay = null;

const TEMP_SYS = { METRIC: 'metric', IMPERIAL: 'imperial' };

let currentTemperatureSystem = TEMP_SYS.METRIC;

const getTemperatureSystem = () => {
  return currentTemperatureSystem;
};

const toggleTemperatureSystem = () => {
  currentTemperatureSystem =
    currentTemperatureSystem === TEMP_SYS.IMPERIAL ? TEMP_SYS.METRIC : TEMP_SYS.IMPERIAL;
  AppState.update(UNITS_CHANGE_EVENT, currentTemperatureSystem);
  return currentTemperatureSystem;
};

const isString = (value) => {
  return typeof value === 'string';
};

const timeForLocationOffset = (secondsOffset) => {
  const hoursOffset = secondsOffset / MINUTES / MINUTES;
  const date = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;

  // create new Date object for different location
  // using supplied offset
  return new Date(utcTime + 3600000 * hoursOffset);
};

const getWeatherByDay = (weatherArray) => {
  weatherByDay = new Map();

  weatherArray.every((dayWeather) => {
    const date = new Date(dayWeather.dt_txt);
    if (weatherByDay.size === FORECAST_DAYS_COUNT && !weatherByDay.get(date.getDay())) {
      return false;
    }

    if (!weatherByDay.get(date.getDay())) {
      weatherByDay.set(date.getDay(), {});
    }
    weatherByDay.get(date.getDay())[date.getHours()] = dayWeather;
    return true;
  });
  return weatherByDay;
};

const Iterator = (array = [], startValue = null, loop = false) => {
  let index = 0;
  if (startValue !== null) {
    array.some((value, id) => {
      if (value === startValue) {
        index = id;
        return true;
      }
    });
  }
  return {
    hasNext() {
      if (index >= array.length) {
        return loop ? !(index = 0) : loop;
      }
      return true;
    },
    next() {
      if (!this.hasNext()) return null;
      return array[index++];
    },
    length: array.length,
  };
};

const getCurrentDayIndex = () => {
  const currentDate = new Date();
  let dayIndex = new Date().getDay();

  if (currentDate.getHours() >= 22 && currentDate.getMinutes() > 30) {
    // 6 - day index for Saturday
    dayIndex = dayIndex === 6 ? 0 : dayIndex + 1;
  }
  return dayIndex;
};

const timeToOpenWeatherTime = (date) => {
  const currentTime = date.getHours() * MINUTES + date.getMinutes();
  const openWeatherTime = Math.min(
    ...openWeatherTimeline.filter((time) => currentTime <= time + HOUR_AND_HALF),
  );
  return openWeatherTime / MINUTES;
};

const getDayNameById = (dayId) => {
  return WEEK_DAYS[dayId];
};

const getOrdinalNumberEnding = (number) => {
  let ending = 'th';
  if (number === 1) ending = 'st';
  if (number === 2) ending = 'nd';
  if (number === 3) ending = 'rd';
  return ending;
};

export {
  isString,
  getOrdinalNumberEnding,
  getDayNameById,
  timeToOpenWeatherTime,
  getWeatherByDay,
  getTemperatureSystem,
  toggleTemperatureSystem,
  TEMP_SYS,
  UNITS_CHANGE_EVENT,
  Iterator,
  timeForLocationOffset,
  getCurrentDayIndex,
};
