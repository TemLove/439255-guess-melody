import {showScreen} from "./util";
import WelcomeScreen from "./welcome/welcome-screen";
import ResultScreen from "./result/result-screen";
import GameScreen from "./game/game-screen";
import GameModel from "./game/game-model";

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    showScreen(welcome.view.element);
  }

  static showGame(data) {
    const model = new GameModel(data);
    const gameScreen = new GameScreen(model);
    showScreen(gameScreen.view.element);
    gameScreen.startGame();
  }

  static showResult(stats) {
    const statistics = new ResultScreen(stats);
    showScreen(statistics.view.element);
  }

}
