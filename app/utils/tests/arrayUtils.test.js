/**
 * Test arrayUtils
 */

import { insertAt, removeAt } from 'utils/arrayUtils';

describe('arrayUtils test', () => {
  let array;

  beforeEach(() => {
    array = [...Array(5).keys()];
  });

  it('should insert element at position', () => {
    expect(array.length).toEqual(5);

    const expected = 50;
    insertAt(array, 2, expected);

    expect(array).toStrictEqual([0, 1, expected, 2, 3, 4]);
  });

  it('should remove element at position', () => {
    expect(array.length).toEqual(5);

    const expected = 3;
    removeAt(array, expected);

    expect(array).toStrictEqual([0, 1, 2, 4]);
  });
});
