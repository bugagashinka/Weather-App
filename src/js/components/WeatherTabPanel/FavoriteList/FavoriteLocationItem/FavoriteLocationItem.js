import Component from '../../../../framework/Component';
import AppState from '../../../../services/AppState';
import { LIST_LOC_EVENT } from '../../../../utils/const';

export default class FavoriteLocationItem extends Component {
  favoriteStatusChange() {
    this.changeStatus(this.props.loc);
  }

  changeStatus(location) {
    //propagate location to parent listener
  }

  revisitLocation() {
    AppState.update(LIST_LOC_EVENT, { place: this.props.loc.replace(':', ',') });
  }

  render() {
    return `
        <div class="fav-item">
          <div class="search-item-content">
            <div class="fav-item-loc" 
              onClick="${this.revisitLocation}">${this.props.loc.replace(':', ',')}
            </div>
            <FavoriteLocation
              classList="fav-item-button"
              checked="true"
              onChangeStatus="${this.favoriteStatusChange}"
            />
          </div>
        </div>`;
  }
}
