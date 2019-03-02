  import {App} from './components/App/';

  new App(document.getElementById('app'));

  // const STORAGE = window.localStorage;
  // const STORAGE_IMG_KEY = 'lastImg';
  // const IMG_ARR = ['kyiv,ua', 'florida,usa', 'colorado,usa', 'nyc,usa'];

  // const target = document.getElementsByClassName('target')[0];
  // const bgImage = document.getElementsByClassName('bg-image')[0];

  // target.addEventListener('mousemove', e => {
  //   let moveX = (e.pageX * -1) / 20;
  //   let moveY = (e.pageY * -1) / 20;
  //   e.target.style.backgroundPosition = `${moveX}px ${moveY}px`;
  // });

  // const shuffle = arr => {
  //   return arr.sort(function() {
  //     return 0.5 - Math.random();
  //   });
  // };

  // const randImgArr = shuffle(IMG_ARR);
  // const lastImg = STORAGE.getItem(STORAGE_IMG_KEY);
  // const randImg = lastImg === randImgArr[0] ? randImgArr[1] : randImgArr[0];

  // bgImage.style.backgroundImage = `url('./img/${randImg}.jpg')`;
  // target.style.backgroundImage = `url('./img/${randImg}.jpg')`;
  // STORAGE.setItem(STORAGE_IMG_KEY, randImg);

