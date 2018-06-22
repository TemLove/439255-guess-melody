import {showScreen} from "./util";
import getlevelArtistScreen from "./screen-level-artist";
import getResultScreen from "./screen-result";
import {changeLevel, saveAnswer, canContinue} from "./data/game-data";
import LevelGenreView from "./view/level-genre-view";

const getlevelGenreScreen = (data) => {
  const levelGenreView = new LevelGenreView(data);

  levelGenreView.onSubmitButtonClick = (evt) => {
    evt.preventDefault();

    const answer = levelGenreView.getUserAnswer();
    const gameData = saveAnswer(data, answer);

    const nextLevel = gameData.currentScreen + 1;

    if (canContinue(gameData)) {
      showScreen(getResultScreen(gameData));
    } else {
      if (gameData.levelsData[nextLevel].type === `artist`) {
        showScreen(getlevelArtistScreen(changeLevel(gameData, nextLevel)));
      }
      if (gameData.levelsData[nextLevel].type === `genre`) {
        showScreen(getlevelGenreScreen(changeLevel(gameData, nextLevel)));
      }
    }

    levelGenreView.remove();
  };

  return levelGenreView.element;
};

export default getlevelGenreScreen;
