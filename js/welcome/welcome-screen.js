import {gameOptions} from "../data/game-data";
import WelcomeScreenView from "./welcome-view";
import Application from "../application";

export default class WelcomeScreen {

  constructor(data, options = gameOptions) {
    this.view = new WelcomeScreenView(options);
    this.view.onButtonClick = () => {
      Application.showGame(data);
    };
  }

}
