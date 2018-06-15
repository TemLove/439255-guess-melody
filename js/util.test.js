import {assert} from 'chai';
import {getRadius} from './util';

describe(`getRadius function`, () => {
  describe(`Should correctly calculate circle length`, () => {
    it(`Should return full length and 0 in initial state`, () => {
      // 2 * 3.14 * 100 = 6.28 * 100 = 628
      assert.strictEqual(getRadius(1, 100).stroke, 628);
      assert.strictEqual(getRadius(1, 100).offset, 0);
    });

    it(`Should return 0 and full length in the final state`, () => {
      // 2 * 3.14 * 100 = 6.28 * 100 = 628
      assert.strictEqual(getRadius(0, 100).stroke, 628);
      assert.strictEqual(getRadius(0, 100).offset, 628);
    });

    it(`Offset and length should be equal on a half`, () => {
      // 2 * 3.14 * 100 / 2 = 3.14 * 100 = 314
      assert.strictEqual(getRadius(0.5, 100).stroke, 628);
      assert.strictEqual(getRadius(0.5, 100).offset, 314);
    });
  });
});
