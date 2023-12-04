import appLanguageProviderReducer from '../reducer';
import { CHANGE_LOCALE } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('appLanguageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(appLanguageProviderReducer(undefined, {})).toEqual({
      locale: 'en',
    });
  });

  it('changes the locale', () => {
    expect(
      appLanguageProviderReducer(undefined, {
        type: CHANGE_LOCALE,
        locale: 'ar',
      }),
    ).toEqual({
      locale: 'ar',
    });
  });
});
