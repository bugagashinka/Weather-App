class WeatherServices {
  getCurrentWeather() {
    return [
      {
        id: 703448,
        name: "Kyiv",
        coord: { lat: 50.4501, lon: 30.5241 },
        main: {
          temp: 5.33,
          pressure: 1021,
          humidity: 89,
          temp_min: 5,
          temp_max: 6.11
        },
        dt: 1551949913,
        wind: { speed: 5, deg: 170 },
        sys: { country: "UA" },
        rain: null,
        snow: null,
        clouds: { all: 40 },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ]
      },
      {
        id: 7525990,
        name: "Kyiv",
        coord: { lat: 47.8654, lon: 31.0213 },
        main: {
          temp: 7.22,
          pressure: 1024.85,
          humidity: 87,
          temp_min: 7.22,
          temp_max: 7.22,
          sea_level: 1024.85,
          grnd_level: 1006.82
        },
        dt: 1551950079,
        wind: { speed: 3.91, deg: 151.001 },
        sys: { country: "UA" },
        rain: null,
        snow: null,
        clouds: { all: 0 },
        weather: [
          { id: 800, main: "Clear", description: "Sky is Clear", icon: "01d" }
        ]
      }
    ];
  }
  getWeatherForecast() {
    return [
      {
        dt: 1551960000,
        main: {
          temp: 8.29,
          temp_min: 7.86,
          temp_max: 8.29,
          pressure: 1020.17,
          sea_level: 1020.17,
          grnd_level: 1005.65,
          humidity: 75,
          temp_kf: 0.44
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d"
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 8.41,
          deg: 179.502
        },
        rain: {},
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-07 12:00:00"
      },
      {
        dt: 1551970800,
        main: {
          temp: 8.47,
          temp_min: 8.15,
          temp_max: 8.47,
          pressure: 1017.64,
          sea_level: 1017.64,
          grnd_level: 1003.03,
          humidity: 66,
          temp_kf: 0.33
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ],
        clouds: {
          all: 36
        },
        wind: {
          speed: 8.42,
          deg: 183.51
        },
        rain: {},
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-07 15:00:00"
      },
      {
        dt: 1551981600,
        main: {
          temp: 7.28,
          temp_min: 7.06,
          temp_max: 7.28,
          pressure: 1016.67,
          sea_level: 1016.67,
          grnd_level: 1001.97,
          humidity: 64,
          temp_kf: 0.22
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 68
        },
        wind: {
          speed: 8.81,
          deg: 189.001
        },
        rain: {},
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-07 18:00:00"
      },
      {
        dt: 1551992400,
        main: {
          temp: 7.46,
          temp_min: 7.35,
          temp_max: 7.46,
          pressure: 1015.5,
          sea_level: 1015.5,
          grnd_level: 1000.78,
          humidity: 65,
          temp_kf: 0.11
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 88
        },
        wind: {
          speed: 9.17,
          deg: 197.001
        },
        rain: {},
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-07 21:00:00"
      },
      {
        dt: 1552003200,
        main: {
          temp: 7.65,
          temp_min: 7.65,
          temp_max: 7.65,
          pressure: 1014.59,
          sea_level: 1014.59,
          grnd_level: 999.92,
          humidity: 66,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 92
        },
        wind: {
          speed: 9.08,
          deg: 205.001
        },
        rain: {},
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-08 00:00:00"
      },
      {
        dt: 1552014000,
        main: {
          temp: 8.12,
          temp_min: 8.12,
          temp_max: 8.12,
          pressure: 1013.54,
          sea_level: 1013.54,
          grnd_level: 998.76,
          humidity: 66,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 88
        },
        wind: {
          speed: 8.41,
          deg: 208.002
        },
        rain: {},
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-08 03:00:00"
      },
      {
        dt: 1552024800,
        main: {
          temp: 8.39,
          temp_min: 8.39,
          temp_max: 8.39,
          pressure: 1013.52,
          sea_level: 1013.52,
          grnd_level: 998.83,
          humidity: 68,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d"
          }
        ],
        clouds: {
          all: 44
        },
        wind: {
          speed: 7.66,
          deg: 209.001
        },
        rain: {},
        snow: {
          "3h": 0.0005
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-08 06:00:00"
      },
      {
        dt: 1552035600,
        main: {
          temp: 11.53,
          temp_min: 11.53,
          temp_max: 11.53,
          pressure: 1013.05,
          sea_level: 1013.05,
          grnd_level: 998.5,
          humidity: 68,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ],
        clouds: {
          all: 36
        },
        wind: {
          speed: 8.37,
          deg: 216.002
        },
        rain: {},
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-08 09:00:00"
      },
      {
        dt: 1552046400,
        main: {
          temp: 14.24,
          temp_min: 14.24,
          temp_max: 14.24,
          pressure: 1012.31,
          sea_level: 1012.31,
          grnd_level: 997.89,
          humidity: 67,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d"
          }
        ],
        clouds: {
          all: 64
        },
        wind: {
          speed: 7.37,
          deg: 223.503
        },
        rain: {
          "3h": 0.0025
        },
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-08 12:00:00"
      },
      {
        dt: 1552057200,
        main: {
          temp: 13.73,
          temp_min: 13.73,
          temp_max: 13.73,
          pressure: 1011.61,
          sea_level: 1011.61,
          grnd_level: 997.24,
          humidity: 66,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 88
        },
        wind: {
          speed: 7.41,
          deg: 229.505
        },
        rain: {},
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-08 15:00:00"
      },
      {
        dt: 1552068000,
        main: {
          temp: 11.93,
          temp_min: 11.93,
          temp_max: 11.93,
          pressure: 1012.87,
          sea_level: 1012.87,
          grnd_level: 998.28,
          humidity: 65,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n"
          }
        ],
        clouds: {
          all: 20
        },
        wind: {
          speed: 7.16,
          deg: 243.502
        },
        rain: {},
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-08 18:00:00"
      },
      {
        dt: 1552078800,
        main: {
          temp: 10,
          temp_min: 10,
          temp_max: 10,
          pressure: 1013.64,
          sea_level: 1013.64,
          grnd_level: 999.09,
          humidity: 74,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "02n"
          }
        ],
        clouds: {
          all: 8
        },
        wind: {
          speed: 5.41,
          deg: 249.501
        },
        rain: {},
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-08 21:00:00"
      },
      {
        dt: 1552089600,
        main: {
          temp: 8.11,
          temp_min: 8.11,
          temp_max: 8.11,
          pressure: 1014.85,
          sea_level: 1014.85,
          grnd_level: 1000.16,
          humidity: 72,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 56
        },
        wind: {
          speed: 5.51,
          deg: 256.008
        },
        rain: {},
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-09 00:00:00"
      },
      {
        dt: 1552100400,
        main: {
          temp: 7.21,
          temp_min: 7.21,
          temp_max: 7.21,
          pressure: 1015.79,
          sea_level: 1015.79,
          grnd_level: 1001.08,
          humidity: 79,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 64
        },
        wind: {
          speed: 4.46,
          deg: 267
        },
        rain: {},
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-09 03:00:00"
      },
      {
        dt: 1552111200,
        main: {
          temp: 7.02,
          temp_min: 7.02,
          temp_max: 7.02,
          pressure: 1017.27,
          sea_level: 1017.27,
          grnd_level: 1002.65,
          humidity: 78,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ],
        clouds: {
          all: 32
        },
        wind: {
          speed: 4.8,
          deg: 264.502
        },
        rain: {},
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-09 06:00:00"
      },
      {
        dt: 1552122000,
        main: {
          temp: 9.86,
          temp_min: 9.86,
          temp_max: 9.86,
          pressure: 1017.72,
          sea_level: 1017.72,
          grnd_level: 1003.13,
          humidity: 79,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d"
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 5.19,
          deg: 266.003
        },
        rain: {},
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-09 09:00:00"
      },
      {
        dt: 1552132800,
        main: {
          temp: 10.82,
          temp_min: 10.82,
          temp_max: 10.82,
          pressure: 1016.65,
          sea_level: 1016.65,
          grnd_level: 1002.19,
          humidity: 71,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d"
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 6.17,
          deg: 273.003
        },
        rain: {},
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-09 12:00:00"
      },
      {
        dt: 1552143600,
        main: {
          temp: 9.67,
          temp_min: 9.67,
          temp_max: 9.67,
          pressure: 1015.58,
          sea_level: 1015.58,
          grnd_level: 1001.08,
          humidity: 65,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
          }
        ],
        clouds: {
          all: 32
        },
        wind: {
          speed: 4.37,
          deg: 265.506
        },
        rain: {},
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-09 15:00:00"
      },
      {
        dt: 1552154400,
        main: {
          temp: 6.91,
          temp_min: 6.91,
          temp_max: 6.91,
          pressure: 1015.21,
          sea_level: 1015.21,
          grnd_level: 1000.69,
          humidity: 78,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10n"
          }
        ],
        clouds: {
          all: 92
        },
        wind: {
          speed: 3.13,
          deg: 238.503
        },
        rain: {
          "3h": 0.525
        },
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-09 18:00:00"
      },
      {
        dt: 1552165200,
        main: {
          temp: 5.92,
          temp_min: 5.92,
          temp_max: 5.92,
          pressure: 1013.38,
          sea_level: 1013.38,
          grnd_level: 998.72,
          humidity: 97,
          temp_kf: 0
        },
        weather: [
          {
            id: 501,
            main: "Rain",
            description: "moderate rain",
            icon: "10n"
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 1.67,
          deg: 203.503
        },
        rain: {
          "3h": 7.28
        },
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-09 21:00:00"
      },
      {
        dt: 1552176000,
        main: {
          temp: 6.58,
          temp_min: 6.58,
          temp_max: 6.58,
          pressure: 1010.41,
          sea_level: 1010.41,
          grnd_level: 995.79,
          humidity: 95,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10n"
          }
        ],
        clouds: {
          all: 56
        },
        wind: {
          speed: 4.22,
          deg: 182.005
        },
        rain: {
          "3h": 1.67
        },
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-10 00:00:00"
      },
      {
        dt: 1552186800,
        main: {
          temp: 5.33,
          temp_min: 5.33,
          temp_max: 5.33,
          pressure: 1007.13,
          sea_level: 1007.13,
          grnd_level: 992.53,
          humidity: 92,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n"
          }
        ],
        clouds: {
          all: 32
        },
        wind: {
          speed: 4.92,
          deg: 217.5
        },
        rain: {},
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-10 03:00:00"
      },
      {
        dt: 1552197600,
        main: {
          temp: 4.75,
          temp_min: 4.75,
          temp_max: 4.75,
          pressure: 1005.01,
          sea_level: 1005.01,
          grnd_level: 990.4,
          humidity: 94,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d"
          }
        ],
        clouds: {
          all: 76
        },
        wind: {
          speed: 5.82,
          deg: 227
        },
        rain: {
          "3h": 0.25
        },
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-10 06:00:00"
      },
      {
        dt: 1552208400,
        main: {
          temp: 5.32,
          temp_min: 5.32,
          temp_max: 5.32,
          pressure: 1004.03,
          sea_level: 1004.03,
          grnd_level: 989.54,
          humidity: 99,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d"
          }
        ],
        clouds: {
          all: 92
        },
        wind: {
          speed: 7.46,
          deg: 259.5
        },
        rain: {
          "3h": 2.83
        },
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-10 09:00:00"
      },
      {
        dt: 1552219200,
        main: {
          temp: 6.84,
          temp_min: 6.84,
          temp_max: 6.84,
          pressure: 1005.66,
          sea_level: 1005.66,
          grnd_level: 991.29,
          humidity: 88,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d"
          }
        ],
        clouds: {
          all: 12
        },
        wind: {
          speed: 9.18,
          deg: 303.001
        },
        rain: {
          "3h": 0.7
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-10 12:00:00"
      },
      {
        dt: 1552230000,
        main: {
          temp: 6.95,
          temp_min: 6.95,
          temp_max: 6.95,
          pressure: 1007.17,
          sea_level: 1007.17,
          grnd_level: 992.67,
          humidity: 79,
          temp_kf: 0
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02d"
          }
        ],
        clouds: {
          all: 20
        },
        wind: {
          speed: 7.55,
          deg: 283.504
        },
        rain: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-10 15:00:00"
      },
      {
        dt: 1552240800,
        main: {
          temp: 4.34,
          temp_min: 4.34,
          temp_max: 4.34,
          pressure: 1008.86,
          sea_level: 1008.86,
          grnd_level: 994.2,
          humidity: 82,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10n"
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 6.16,
          deg: 268.5
        },
        rain: {
          "3h": 0.0099999999999998
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-10 18:00:00"
      },
      {
        dt: 1552251600,
        main: {
          temp: 2.36,
          temp_min: 2.36,
          temp_max: 2.36,
          pressure: 1007.22,
          sea_level: 1007.22,
          grnd_level: 992.6,
          humidity: 85,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 64
        },
        wind: {
          speed: 3.87,
          deg: 213.501
        },
        rain: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-10 21:00:00"
      },
      {
        dt: 1552262400,
        main: {
          temp: 3.17,
          temp_min: 3.17,
          temp_max: 3.17,
          pressure: 1005.1,
          sea_level: 1005.1,
          grnd_level: 990.46,
          humidity: 93,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10n"
          }
        ],
        clouds: {
          all: 92
        },
        wind: {
          speed: 6.61,
          deg: 194.001
        },
        rain: {
          "3h": 1.23
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-11 00:00:00"
      },
      {
        dt: 1552273200,
        main: {
          temp: 4.76,
          temp_min: 4.76,
          temp_max: 4.76,
          pressure: 1001.64,
          sea_level: 1001.64,
          grnd_level: 987.05,
          humidity: 90,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10n"
          }
        ],
        clouds: {
          all: 92
        },
        wind: {
          speed: 8.53,
          deg: 208.506
        },
        rain: {
          "3h": 0.99
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-11 03:00:00"
      },
      {
        dt: 1552284000,
        main: {
          temp: 7.32,
          temp_min: 7.32,
          temp_max: 7.32,
          pressure: 1000.38,
          sea_level: 1000.38,
          grnd_level: 985.87,
          humidity: 87,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d"
          }
        ],
        clouds: {
          all: 68
        },
        wind: {
          speed: 7.31,
          deg: 229.001
        },
        rain: {
          "3h": 0.039999999999999
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-11 06:00:00"
      },
      {
        dt: 1552294800,
        main: {
          temp: 9.56,
          temp_min: 9.56,
          temp_max: 9.56,
          pressure: 999.49,
          sea_level: 999.49,
          grnd_level: 985.22,
          humidity: 91,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d"
          }
        ],
        clouds: {
          all: 80
        },
        wind: {
          speed: 5.85,
          deg: 241.501
        },
        rain: {
          "3h": 0.020000000000001
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-11 09:00:00"
      },
      {
        dt: 1552305600,
        main: {
          temp: 10.49,
          temp_min: 10.49,
          temp_max: 10.49,
          pressure: 998.98,
          sea_level: 998.98,
          grnd_level: 984.63,
          humidity: 88,
          temp_kf: 0
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d"
          }
        ],
        clouds: {
          all: 76
        },
        wind: {
          speed: 6.07,
          deg: 262.504
        },
        rain: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-11 12:00:00"
      },
      {
        dt: 1552316400,
        main: {
          temp: 8.7,
          temp_min: 8.7,
          temp_max: 8.7,
          pressure: 999.31,
          sea_level: 999.31,
          grnd_level: 985.04,
          humidity: 84,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d"
          }
        ],
        clouds: {
          all: 88
        },
        wind: {
          speed: 5.03,
          deg: 267
        },
        rain: {
          "3h": 0.0099999999999998
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-11 15:00:00"
      },
      {
        dt: 1552327200,
        main: {
          temp: 6.02,
          temp_min: 6.02,
          temp_max: 6.02,
          pressure: 1000.83,
          sea_level: 1000.83,
          grnd_level: 986.41,
          humidity: 82,
          temp_kf: 0
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n"
          }
        ],
        clouds: {
          all: 88
        },
        wind: {
          speed: 5.8,
          deg: 268.503
        },
        rain: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-11 18:00:00"
      },
      {
        dt: 1552338000,
        main: {
          temp: 4.87,
          temp_min: 4.87,
          temp_max: 4.87,
          pressure: 1001.95,
          sea_level: 1001.95,
          grnd_level: 987.41,
          humidity: 89,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10n"
          }
        ],
        clouds: {
          all: 32
        },
        wind: {
          speed: 5.57,
          deg: 263
        },
        rain: {
          "3h": 0.02
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-11 21:00:00"
      },
      {
        dt: 1552348800,
        main: {
          temp: 2.3,
          temp_min: 2.3,
          temp_max: 2.3,
          pressure: 1005.09,
          sea_level: 1005.09,
          grnd_level: 990.47,
          humidity: 90,
          temp_kf: 0
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10n"
          }
        ],
        clouds: {
          all: 76
        },
        wind: {
          speed: 8.96,
          deg: 317.5
        },
        rain: {
          "3h": 0.11
        },
        snow: {
          "3h": 0.0075
        },
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-12 00:00:00"
      },
      {
        dt: 1552359600,
        main: {
          temp: -1.35,
          temp_min: -1.35,
          temp_max: -1.35,
          pressure: 1008.26,
          sea_level: 1008.26,
          grnd_level: 993.53,
          humidity: 80,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n"
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 6.41,
          deg: 304.501
        },
        rain: {},
        snow: {},
        sys: {
          pod: "n"
        },
        dt_txt: "2019-03-12 03:00:00"
      },
      {
        dt: 1552370400,
        main: {
          temp: -0.96,
          temp_min: -0.96,
          temp_max: -0.96,
          pressure: 1009.3,
          sea_level: 1009.3,
          grnd_level: 994.47,
          humidity: 84,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d"
          }
        ],
        clouds: {
          all: 0
        },
        wind: {
          speed: 5.41,
          deg: 262.004
        },
        rain: {},
        snow: {},
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-12 06:00:00"
      },
      {
        dt: 1552381200,
        main: {
          temp: 2.76,
          temp_min: 2.76,
          temp_max: 2.76,
          pressure: 1009.81,
          sea_level: 1009.81,
          grnd_level: 995.03,
          humidity: 85,
          temp_kf: 0
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d"
          }
        ],
        clouds: {
          all: 20
        },
        wind: {
          speed: 9.37,
          deg: 279.003
        },
        rain: {},
        snow: {
          "3h": 0.03
        },
        sys: {
          pod: "d"
        },
        dt_txt: "2019-03-12 09:00:00"
      }
    ];
  }
}

export default new WeatherServices();
