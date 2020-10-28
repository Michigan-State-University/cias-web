/**
 * Test hasDuplicates
 */

import { hasDuplicates } from 'utils/hasDuplicates';

describe('hasDuplicates test', () => {
  const arrayWithoutDuplicates = [...Array(5).keys()];
  const arrayWithDuplicates = [...Array(5).keys(), 1];

  it('should return false when there is only one item of certain value', () => {
    expect(hasDuplicates(arrayWithoutDuplicates, 1)).toBeFalsy();
  });

  it('should return true when there is more than one item of certain value', () => {
    expect(hasDuplicates(arrayWithDuplicates, 1)).toBeTruthy();
  });
});
