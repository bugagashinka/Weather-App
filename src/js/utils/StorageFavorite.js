import { STORAGE_FAV_LIST } from './const';
import Storage from './Storage';

class StorageFavorite extends Storage {
  addFavorite(favorite) {
    let updateFavList;
    if (!super.getItem(STORAGE_FAV_LIST)) {
      updateFavList = [favorite];
    } else {
      updateFavList = super.getItem(STORAGE_FAV_LIST).split(',');
      updateFavList.push(favorite);
    }
    return super.setItem(STORAGE_FAV_LIST, updateFavList);
  }

  getFavoriteList() {
    return super.getItem(STORAGE_FAV_LIST);
  }

  removeFavorite(favorite) {
    const updateCityList = super.getItem(STORAGE_FAV_LIST).split(',');
    updateCityList.splice(updateCityList.indexOf(favorite), 1);
    return super.setItem(STORAGE_FAV_LIST, updateCityList);
  }

  isFavorite(supposedFav) {
    const favList = super.getItem(STORAGE_FAV_LIST);
    return favList ? favList.split(',').includes(supposedFav) : false;
  }
}

export default new StorageFavorite();
