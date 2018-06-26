import {gameOptions} from "../data/game-data";
import WelcomeScreenView from "./welcome-view";
import Application from "../application";

export default class WelcomeScreen {

  constructor(data = gameOptions) {
    this.view = new WelcomeScreenView(data);
    this.view.onButtonClick = () => {
      Application.showGame();
    };
  }

}
