import {getLevelData} from "./level-data";

export const gameOptions = {
  timeAll: 300,
  timeLimitForQuickAnswer: 30,
  levelsCount: 10,
  attemptsCount: 3,
  scoreForRightAnswer: 1,
  scoreForQuickRightAnswer: 2,
  scoreForWrongAnswer: -2
};

export const gameState = {
  isTestingMode: true,
  levelsData: getLevelData(gameOptions.levelsCount),
  currentScreen: 0,
  timeLeft: gameOptions.timeAll,
  attemptsLeft: gameOptions.attemptsCount,
  userAnswers: []
};

export const countResultScore = (userAnswers, attemptsLeft) => {
  if (userAnswers.length < gameOptions.levelsCount || attemptsLeft === 0) {
    return -1;
  }

  return userAnswers.reduce((acc, it) => {
    if (it.isAnswerRight && it.spendedTime < gameOptions.timeLimitForQuickAnswer) {
      acc += gameOptions.scoreForQuickRightAnswer;
    }

    if (it.isAnswerRight && it.spendedTime >= gameOptions.timeLimitForQuickAnswer) {
      acc += gameOptions.scoreForRightAnswer;
    }

    if (!it.isAnswerRight) {
      acc += gameOptions.scoreForWrongAnswer;
    }

    return acc;
  }, 0);
};

export const getTimer = (time = gameOptions.timeAll) => {
  return {
    _time: time >= 0 ? time : -time,

    get time() {
      return this._time > 0 ? this._time : -1;
    },

    set time(newTime) {
      if (newTime >= 0) {
        this._time = newTime;
      } else {
        throw new Error(`Time should be possitive`);
      }
    },

    tick() {
      this._time -= 1;
      return this._time > 0 ? this._time : -1;
    }
  };
};
