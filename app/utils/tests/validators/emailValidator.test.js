/**
 * Test emailValidator
 */

import { emailValidator } from 'utils/validators';

describe('emailValidator regex', () => {
  it('should return true when checked against valid emails', () => {
    const targets = [
      'test@com.pl',
      'partcipant@cias-api.herokuapp.com',
      'partcipant@gmail.com',
    ];

    targets.forEach((target) => expect(emailValidator(target)).toBeTruthy());
  });

  it('should return false when checked against non-valid emails', () => {
    const targets = [
      '', // empty
      'test', // no domain
      'test@com', // invalid domain
      'test@comp.pl.',
      'test@',
    ];

    targets.forEach((target) => expect(emailValidator(target)).toBeFalsy());
  });
});
