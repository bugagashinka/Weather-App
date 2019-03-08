  import {App} from './components/App/';
  import {Temperature} from '../';

  new App(document.getElementById('app'));

  const container = document.getElementsByClassName('container')[0];
  const target = document.getElementsByClassName('target')[0];
  const body = document.getElementsByTagName('body')[0];
  const bgImage = document.getElementsByClassName('bg-image')[0];

  body.addEventListener('mousemove', e => {
    let moveX = (e.pageX * -1) / 25;
    let moveY = (e.pageY * -1) / 25;
    target.style.backgroundPosition = `${moveX}px ${moveY}px`;
  });

  const STORAGE_IMG_KEY = 'lastImg';
  const storage = window.localStorage;

  const imgArr = ['kyiv,ua', 'florida,usa', 'colorado,usa', 'nyc,usa'];

  const shuffle = arr => {
    return arr.sort(function () {
      return 0.5 - Math.random();
    });
  };

  const randImgArr = shuffle(imgArr);
  const lastImg = storage.getItem(STORAGE_IMG_KEY);
  const randImg = lastImg === randImgArr[0] ? randImgArr[1] : randImgArr[0];
  bgImage.style.backgroundImage = `url('./assets/img/${randImg}.jpg')`;
  target.style.backgroundImage = `url('./assets/img/${randImg}.jpg')`;
  storage.setItem(STORAGE_IMG_KEY, randImg);

