/**
 * Test urlValidator
 */

import { urlValidator } from 'utils/validators';

describe('urlValidator regex', () => {
  it('should return true when checked against valid urls', () => {
    const targets = [
      'https://cias-web.herokuapp.com/',
      'http://cias-web.herokuapp.com/',
      'www.google.com',
      '172.16.254.1',
    ];

    targets.forEach((target) => expect(urlValidator(target)).toBeTruthy());
  });

  it('should return false when checked against non-valid urls', () => {
    const targets = [
      'http://cias-web. herokuapp.com/', // with space
      'http://localhost:{4200}', // invalid {}
      'localhost:4200^', // invalid ^
    ];

    targets.forEach((target) => expect(urlValidator(target)).toBeFalsy());
  });
});
