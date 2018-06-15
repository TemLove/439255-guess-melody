import {assert} from 'chai';
import {countResultScore, getTimer} from './game-data';

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
