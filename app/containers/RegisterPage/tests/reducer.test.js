import registerPageReducer, { initialState } from '../reducer';

import {
  REGISTER_PARTICIPANT_REQUEST,
  REGISTER_PARTICIPANT_SUCCESS,
  REGISTER_PARTICIPANT_ERROR,
  REGISTER_FROM_INVITATION_REQUEST,
  REGISTER_FROM_INVITATION_SUCCESS,
  REGISTER_FROM_INVITATION_ERROR,
} from '../constants';

describe('registerPageReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(registerPageReducer(undefined, {})).toEqual(expectedResult);
  });
  it('test REGISTER_PARTICIPANT_REQUEST action', () => {
    const expectedResult = {
      error: null,
      loading: true,
      success: false,
    };

    const action = { type: REGISTER_PARTICIPANT_REQUEST };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test REGISTER_FROM_INVITATION_REQUEST action', () => {
    const expectedResult = {
      error: null,
      loading: true,
      success: false,
    };

    const action = { type: REGISTER_FROM_INVITATION_REQUEST };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test REGISTER_PARTICIPANT_SUCCESS action', () => {
    const expectedResult = {
      error: null,
      loading: false,
      success: true,
    };

    const action = { type: REGISTER_PARTICIPANT_SUCCESS };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test REGISTER_FROM_INVITATION_SUCCESS action', () => {
    const expectedResult = {
      error: null,
      loading: false,
      success: true,
    };

    const action = { type: REGISTER_FROM_INVITATION_SUCCESS };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test REGISTER_PARTICIPANT_ERROR action', () => {
    const error = 'Error!';
    const expectedResult = {
      error,
      loading: false,
      success: false,
    };

    const action = { type: REGISTER_PARTICIPANT_ERROR, payload: { error } };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test REGISTER_FROM_INVITATION_ERROR action', () => {
    const error = 'Error!';
    const expectedResult = {
      error,
      loading: false,
      success: false,
    };

    const action = { type: REGISTER_FROM_INVITATION_ERROR, payload: { error } };
    expect(registerPageReducer(undefined, action)).toEqual(expectedResult);
  });
});
