import {assert} from 'chai';
import {countResultScore, getResultMessage, getTimer, getTimeString} from './game-data';

describe(`Result count function`, () => {
  it(`Should return -1 when answers count less than 10`, () => {
    assert.strictEqual(-1, countResultScore([{isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 60}], 3));
    assert.strictEqual(-1, countResultScore([{isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: false, spendedTime: 90}], 2));
    assert.strictEqual(-1, countResultScore([{isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: false, spendedTime: 60},
      {isAnswerRight: false, spendedTime: 90}], 1));
  });

  it(`Should return -1 when no more attempts left`, () => {
    assert.strictEqual(-1, countResultScore([{isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: true, spendedTime: 30},
      {isAnswerRight: false, spendedTime: 30},
      {isAnswerRight: false, spendedTime: 30},
      {isAnswerRight: false, spendedTime: 20}], 0));
  });

  it(`Should count 2 points for correct answer when spended time less than 30 second`, () => {
    assert.strictEqual(20, countResultScore([{isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20}], 3));
  });

  it(`Should count 1 points for correct answer when spended time more than 30 second`, () => {
    assert.strictEqual(20, countResultScore([{isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20}], 3));
    assert.strictEqual(19, countResultScore([{isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 40}], 3));
    assert.strictEqual(18, countResultScore([{isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 40},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 40}], 3));
  });

  it(`Should count -2 points for wrong answer`, () => {
    assert.strictEqual(16, countResultScore([{isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: false, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20}], 2));
    assert.strictEqual(12, countResultScore([{isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: false, spendedTime: 20},
      {isAnswerRight: false, spendedTime: 40}], 1));
    assert.strictEqual(11, countResultScore([{isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 40},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: true, spendedTime: 20},
      {isAnswerRight: false, spendedTime: 20},
      {isAnswerRight: false, spendedTime: 40}], 1));
  });
});

describe(`getResultMessage function`, () => {
  it(`Should return correct lose message when time is over`, () => {
    assert.strictEqual(`Время вышло! Вы не успели отгадать все мелодии`, getResultMessage([4, 5, 8, 10, 11], {
      score: 4,
      attemptsLeft: 1,
      timeLeft: 0
    }));
  });

  it(`Should return correct lose message when attempts is over`, () => {
    assert.strictEqual(`У вас закончились все попытки. Ничего, повезет в следующи раз!`, getResultMessage([4, 5, 8, 10, 11], {
      score: 12,
      attemptsLeft: 0,
      timeLeft: 5
    }));
  });

  it(`Should return correct win message when game successfully completed`, () => {
    assert.strictEqual(`Вы заняли 1 место из 5. Это лучше, чем у 80% игроков`, getResultMessage([5, 8, 10, 11], {
      score: 12,
      attemptsLeft: 1,
      timeLeft: 5
    }));
    assert.strictEqual(`Вы заняли 4 место из 10. Это лучше, чем у 60% игроков`, getResultMessage([2, 18, 4, 13, 5, 15, 8, 10, 11], {
      score: 12,
      attemptsLeft: 1,
      timeLeft: 5
    }));
  });
});

describe(`getTimer function`, () => {
  it(`Should return timer object with setted time`, () => {
    assert.isObject(getTimer());
    assert.strictEqual(600, getTimer(600).time);
  });

  it(`Tick method should decrease time by tick time`, () => {
    assert.strictEqual(59, getTimer(60).tick());
  });

  it(`Should return -1 when time is over`, () => {
    assert.strictEqual(-1, getTimer(1).tick());
  });

  it(`Shouldn't set negative time`, () => {
    assert.throws(() => {
      getTimer().time = -1000;
    });
  });
});

describe(`getTimeString function`, () => {
  it(`Should return correct time string`, () => {
    assert.deepEqual(`за 1 минуту и 01 секунду`, getTimeString(61));
    assert.deepEqual(`за 2 минуты и 22 секунды`, getTimeString(142));
    assert.deepEqual(`за 3 минуты и 37 секунд`, getTimeString(217));
    assert.deepEqual(`за 4 минуты и 11 секунд`, getTimeString(251));
    assert.deepEqual(`за 5 минут и 00 секунд`, getTimeString(300));
  });
});
