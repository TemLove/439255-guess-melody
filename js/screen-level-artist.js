import {showScreen} from "./util";
import getlevelGenreScreen from "./screen-level-genre";
import getResultScreen from "./screen-result";
import {saveAnswer, changeLevel, canContinue} from "./data/game-data";
import LevelArtistView from "./view/level-artist-view";

const getlevelArtistScreen = (data) => {
  const levelArtistView = new LevelArtistView(data);

  levelArtistView.onAnswerClick = (evt) => {
    const answer = levelArtistView.getUserAnswer(evt.target);
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

    levelArtistView.remove();
  };

  return levelArtistView.element;
};

export default getlevelArtistScreen;
