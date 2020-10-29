import {
  selectAuth,
  makeSelectAuth,
  makeSelectUser,
  makeSelectErrors,
  makeSelectLoaders,
} from '../selectors';

describe('makeSelectAuth', () => {
  const mockUser = {
    id: 'test-id',
    firstName: 'test',
    lastName: 'Test',
    fullName: 'Test User',
    email: 'tes@test.com',
    timeZone: 'America/New_York',
  };

  const mockedState = {
    auth: {
      errors: {
        changePasswordError: 'error',
      },
      loaders: {
        changePasswordLoading: true,
      },
      user: mockUser,
      cache: { user: mockUser },
    },
  };
  const testSelector = selector => selector(mockedState);

  it('should select the auth', () => {
    expect(testSelector(selectAuth)).toEqual(mockedState.auth);
  });

  it('should select the authState', () => {
    expect(testSelector(makeSelectAuth())).toEqual(mockedState.auth);
  });

  it('should select the users', () => {
    expect(testSelector(makeSelectUser())).toEqual(mockUser);
  });
  it('should select the error', () => {
    expect(testSelector(makeSelectErrors())).toEqual(mockedState.auth.errors);
  });
  it('should select the loaders', () => {
    expect(testSelector(makeSelectLoaders())).toEqual(mockedState.auth.loaders);
  });
});
