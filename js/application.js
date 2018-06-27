import {showScreen} from "./util";
import PreloadScreen from "./preload/preload-screen";
import WelcomeScreen from "./welcome/welcome-screen";
import ResultScreen from "./result/result-screen";
import GameScreen from "./game/game-screen";
import GameModel from "./game/game-model";
import ErrorScreen from "./preload/error-screen";
import Loader from "./loader";


export default class Application {

  static showPreload() {
    const preload = new PreloadScreen();
    showScreen(preload.element);
    Loader.loadData().then((data) => Application.showWelcome(data));
  }

  static showWelcome(data) {
    const welcome = new WelcomeScreen(data);
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

  static showError(data) {
    const errorScreen = new ErrorScreen(data);
    showScreen(errorScreen.element);
  }

}
