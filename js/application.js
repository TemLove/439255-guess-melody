import {showScreen} from "./util";
import PreloadScreen from "./preload/preload-screen";
import WelcomeScreen from "./welcome/welcome-screen";
import ResultScreen from "./result/result-screen";
import GameScreen from "./game/game-screen";
import GameModel from "./game/game-model";
import ErrorScreen from "./preload/error-screen";
import Loader from "./loader";
import {getAudio} from "./data/game-data";


export default class Application {

  static showPreload() {
    const preload = new PreloadScreen();
    showScreen(preload.element);
    Loader.loadData().then((data) => Application.showWelcome(data));
  }

  static showWelcome(data) {
    Promise.all(getAudio(data))
      .then((audios) => {
        const audioMap = new Map(audios);
        const gameData = Object.assign({}, {levelsData: data}, {audioMap});
        const welcome = new WelcomeScreen(gameData);
        showScreen(welcome.view.element);
      })
      .catch((err) => Application.showError(err));
  }

  static showGame(data) {
    const model = new GameModel(data);
    const gameScreen = new GameScreen(model);
    showScreen(gameScreen.view.element);
    gameScreen.startGame();
  }

  static showResult(data) {
    Loader.loadResults().then((stats) => {
      const statistics = new ResultScreen(stats, data);
      showScreen(statistics.view.element);
    });
  }

  static showError(data) {
    const errorScreen = new ErrorScreen(data);
    document.body.appendChild(errorScreen.element);
  }

}
