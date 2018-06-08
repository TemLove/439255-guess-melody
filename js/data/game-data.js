export const gameOptions = {
  timeAll: 300000,
  timeLimitForQuickAnswer: 30000,
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
    switch (true) {
      case it.isAnswerRight && it.spendedTime < gameOptions.timeLimitForQuickAnswer :
        acc += gameOptions.scoreForQuickRightAnswer;
        break;
      case it.isAnswerRight :
        acc += gameOptions.scoreForRightAnswer;
        break;
      case !it.isAnswerRight :
        acc += gameOptions.scoreForWrongAnswer;
        break;
    }
    return acc;
  }, 0);
};

export const getResultMessage = (gameResults, userResult) => {
  switch (0) {
    case userResult.timeLeft :
      return `Время вышло! Вы не успели отгадать все мелодии`;
    case userResult.attemptsLeft :
      return `У вас закончились все попытки. Ничего, повезет в следующи раз!`;
    default :
      let results = gameResults.slice();
      results.push(userResult.score);
      results.sort((a, b) => a - b);
      const userPosition = results.length - results.indexOf(userResult.score);
      const playersCount = results.length;
      const successPercent = ((playersCount - userPosition) / playersCount).toFixed(2) * 100;
      return `Вы заняли ${userPosition} место из ${playersCount}. Это лучше, чем у ${successPercent}% игроков`;
  }
};

export const getTimer = (time = gameOptions.timeAll, tickTime = 1000) => {
  return {
    _time: time >= 0 ? time : -time,
    _tickTime: tickTime >= 0 ? tickTime : -tickTime,
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
    get tickTime() {
      return this._tickTime;
    },
    set tickTime(newTime) {
      if (newTime >= 0) {
        this._tickTime = newTime;
      } else {
        throw new Error(`Time should be possitive`);
      }
    },
    tick() {
      this._time -= this._tickTime;
      return this._time > 0 ? this._time : -1;
    }
  };
};
