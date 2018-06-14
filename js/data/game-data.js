import {getLevelData} from "./level-data";

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

export const gameOptions = {
  timeAll: 300,
  timeLimitForQuickAnswer: 30,
  levelsCount: 10,
  attemptsCount: 3,
  scoreForRightAnswer: 1,
  scoreForQuickRightAnswer: 2,
  scoreForWrongAnswer: -2
};

export const gameState = Object.freeze({
  isTestingMode: true,
  levelsData: getLevelData(gameOptions.levelsCount),
  currentScreen: 0,
  timer: getTimer(gameOptions.timeAll),
  attemptsLeft: gameOptions.attemptsCount,
  userAnswers: []
});

export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }

  return Object.assign({}, game, {
    currentScreen: level
  });
};

export const canContinue = (game) => game.attemptsLeft === 0 || !game.levelsData[game.currentScreen + 1];

export const loseAttempt = (game) => {
  const attempts = game.attemptsLeft - 1;

  return Object.assign({}, game, {
    attemptsLeft: attempts
  });
};

export const saveAnswer = (game, answer) => {
  game = answer.isAnswerRight ? game : loseAttempt(game);

  return Object.assign({}, game, {
    userAnswers: [...game.userAnswers, answer]
  });
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
