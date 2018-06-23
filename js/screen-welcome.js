import {showScreen} from "./util";
import getlevelArtistScreen from "./screen-level-artist";
import {gameOptions, gameState} from "./data/game-data";
import getlevelGenreScreen from "./screen-level-genre";
import WelcomeScreenView from "./view/welcome-view";

const welcomeScreenView = new WelcomeScreenView(gameOptions);

welcomeScreenView.onButtonClick = () => {
  const startLevel = gameState.levelsData[0];

  if (startLevel.type === `artist`) {
    showScreen(getlevelArtistScreen(gameState));
  }
  if (startLevel.type === `genre`) {
    showScreen(getlevelGenreScreen(gameState));
  }
};

export default welcomeScreenView.element;
