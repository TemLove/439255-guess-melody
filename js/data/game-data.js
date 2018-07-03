export const IS_TESTING_MODE = true;
export const LEVEL_TYPES = [`artist`, `genre`];

export const getTimer = (time = gameOptions.Time.ALL) => {
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

const getSrcs = (data) => {
  const sources = new Set(data.reduce((acc, level) => {
    return [...acc, ...(level.type === LEVEL_TYPES[0] ? [level.target] : level.answers.map((it) => it.src))];
  }, []));
  return [...sources];
};

export const getAudio = (data) => {
  return getSrcs(data).map((src) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.addEventListener(`loadeddata`, () => {
        resolve([src, audio]);
      }, false);
      audio.addEventListener(`error`, () => {
        reject(`Failed to load audio file`);
      }, false);
      audio.src = src;
    });
  });
};

export const gameOptions = Object.freeze({
  Time: {ALL: 300,
    QUICK_ANSWER_LIMIT: 30,
    CRITICAL_LIMIT: 30},
  levelsCount: 10,
  attemptsCount: 3,
  Score: {ANSWER_RIGHT: 1,
    ANSWER_QUICK: 2,
    ANSWER_WRONG: -2
  }
});

export const gameInitState = Object.freeze({
  currentScreen: 0,
  timer: getTimer(gameOptions.Time.ALL),
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
    if (it.isAnswerRight && it.spendedTime < gameOptions.Time.QUICK_ANSWER_LIMIT) {
      acc += gameOptions.Score.ANSWER_QUICK;
    }

    if (it.isAnswerRight && it.spendedTime >= gameOptions.Time.QUICK_ANSWER_LIMIT) {
      acc += gameOptions.Score.ANSWER_RIGHT;
    }

    if (!it.isAnswerRight) {
      acc += gameOptions.Score.ANSWER_WRONG;
    }

    return acc;
  }, 0);
};

export const countStatistic = (gameResults, userScore) => {

  const results = gameResults.slice();
  results.push(userScore);
  results.sort((a, b) => a - b);

  const userPosition = results.length - results.indexOf(userScore);
  const playersCount = results.length;
  const successPercent = ((playersCount - userPosition) / playersCount).toFixed(2) * 100;

  return {
    userPosition,
    playersCount,
    successPercent
  };
};
