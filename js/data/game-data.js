export const gameOptions = {
  timeAll: 300,
  timeLimitForQuickAnswer: 30,
  levelsCount: 10,
  attemptsCount: 3,
  scoreForRightAnswer: 1,
  scoreForQuickRightAnswer: 2,
  scoreForWrongAnswer: -2
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

export const getResultMessage = (gameResults, userResult) => {
  if (userResult.timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  if (userResult.attemptsLeft === 0) {
    return `У вас закончились все попытки. Ничего, повезет в следующи раз!`;
  }

  let results = gameResults.slice();
  results.push(userResult.score);
  results.sort((a, b) => a - b);

  const userPosition = results.length - results.indexOf(userResult.score);
  const playersCount = results.length;
  const successPercent = ((playersCount - userPosition) / playersCount).toFixed(2) * 100;

  return `Вы заняли ${userPosition} место из ${playersCount}. Это лучше, чем у ${successPercent}% игроков`;
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

const getWordEnding = (num) => {
  if ((num > 10 && num <= 20) || num % 10 > 4 || num % 10 === 0) {
    return ``;
  }
  if (num % 10 === 1) {
    return `у`;
  }
  return `ы`;
};

export const getTimeString = (time) => {
  const second = time % 60;
  const minute = Math.trunc(time / 60);

  return `за ${minute} минут${getWordEnding(minute)} и \
${`${second}`.length < 2 ? `0${second}` : second} секунд${getWordEnding(second)}`;
};
