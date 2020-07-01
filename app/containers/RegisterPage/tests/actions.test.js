import { register } from '../actions';
import { REGISTER_REQUEST } from '../constants';

describe('RegisterPage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: REGISTER_REQUEST,
      };
      expect(register()).toEqual(expected);
    });
  });
});
