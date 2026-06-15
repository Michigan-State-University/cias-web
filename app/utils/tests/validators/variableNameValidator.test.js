/**
 * Test variableNameValidator
 */

import {
  requiredVariableNameValidator,
  variableNameValidator,
} from 'utils/validators';

describe('variableNameValidator regex', () => {
  it('should return false when checked against numbers', () => {
    const targets = ['1', '12', '42'];

    targets.forEach((target) =>
      expect(variableNameValidator(target)).toBeFalse(),
    );
  });

  it('should return true when checked against variables starting with a number', () => {
    const targets = ['3Q', '4_', '5_v'];

    targets.forEach((target) =>
      expect(variableNameValidator(target)).toBeTrue(),
    );
  });

  it('should return true when checked against lowercase', () => {
    const targets = ['var', 'q1', 'single'];

    targets.forEach((target) =>
      expect(variableNameValidator(target)).toBeTrue(),
    );
  });

  it('should return true when checked against uppercase', () => {
    const targets = ['VAR', 'Q3', 'SINGLE'];

    targets.forEach((target) =>
      expect(variableNameValidator(target)).toBeTrue(),
    );
  });

  it("should return true when checked against '_' sign", () => {
    const targets = ['VAR_single', 'Q3_var'];

    targets.forEach((target) =>
      expect(variableNameValidator(target)).toBeTrue(),
    );
  });

  it("should return false when checked against any other character (not number/lowercase/uppercase and '_' sign", () => {
    const targets = [
      '-',
      ' ',
      ';',
      '[',
      '|',
      '}',
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '(',
      ')',
    ];

    targets.forEach((target) =>
      expect(variableNameValidator(target)).toBeFalse(),
    );
  });
});

describe('requiredVariableNameValidator', () => {
  it('should return false for an empty value (variable is required)', () => {
    expect(requiredVariableNameValidator('')).toBeFalse();
  });

  it('should return true for a valid non-empty variable name', () => {
    ['var', 'q1', 'systolic_bp', '3Q'].forEach((target) =>
      expect(requiredVariableNameValidator(target)).toBeTrue(),
    );
  });

  it('should return false for an invalid variable name', () => {
    ['-', ' ', '@', '1'].forEach((target) =>
      expect(requiredVariableNameValidator(target)).toBeFalse(),
    );
  });
});
