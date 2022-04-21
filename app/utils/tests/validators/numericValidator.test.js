/**
 * Test numericValidator
 */

import { numericValidator } from 'utils/validators';

describe('numericValidator regex', () => {
  it('should return true when checked against single digits', () => {
    const targets = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    targets.forEach((target) => expect(numericValidator(target)).toBeTruthy());
  });

  it('should return true when checked against numbers', () => {
    const targets = ['12', '31', '50', '1231'];

    targets.forEach((target) => expect(numericValidator(target)).toBeTruthy());
  });

  it('should return false when checked against any character that is not digit/number', () => {
    const targets = ['a', 'single', '-', '#', '1 ', ' ', '1test', '4 check'];

    targets.forEach((target) => expect(numericValidator(target)).toBeFalsy());
  });
});
