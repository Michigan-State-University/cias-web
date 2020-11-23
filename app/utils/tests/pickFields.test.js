/**
 * Test pickFields
 */

import pickFields from 'utils/pickFields';

describe('pickFields test', () => {
  const object = { a: 1, b: 2, c: { d: 3 } };

  it('should return whole object when fields is null or undefined', () => {
    const actualNull = pickFields(object, null);
    const actualUndefined = pickFields(object, undefined);

    expect(actualNull).toStrictEqual(object);
    expect(actualUndefined).toStrictEqual(object);
  });

  it('should return whole object when fields is empty array', () => {
    const actualEmpty = pickFields(object, []);

    expect(actualEmpty).toStrictEqual(object);
  });

  it('should return properties selected by fields array', () => {
    const fields1 = ['a'];
    const fields2 = ['b', 'c'];

    const actual1 = pickFields(object, fields1);
    const actual2 = pickFields(object, fields2);

    const expected1 = { a: 1 };
    const expected2 = { b: 2, c: { d: 3 } };

    expect(actual1).toStrictEqual(expected1);
    expect(actual2).toStrictEqual(expected2);
  });
});
