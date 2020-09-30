import inviteResearcherReducer, { initialState } from '../reducer';
import {
  INVITE_RESEARCHER_REQUEST,
  INVITE_RESEARCHER_SUCCESS,
  INVITE_RESEARCHER_ERROR,
  GET_INVITATIONS_REQUEST,
  GET_INVITATIONS_SUCCESS,
  GET_INVITATIONS_ERROR,
  CANCEL_INVITATION_REQUEST,
  CANCEL_INVITATION_SUCCESS,
  CANCEL_INVITATION_ERROR,
  CHANGE_EMAIL_INPUT,
  CHANGE_ERROR_VALUE,
} from '../constants';

const createState = (key, value) => ({
  ...initialState,
  [key]: value,
});

describe('inviteResearcherReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    const action = {};
    expect(inviteResearcherReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test INVITE_RESEARCHER_REQUEST action', () => {
    const expectedResult = createState('invite', {
      email: '',
      loading: true,
      error: null,
    });

    const action = { type: INVITE_RESEARCHER_REQUEST };
    expect(inviteResearcherReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test INVITE_RESEARCHER_SUCCESS action', () => {
    let expectedResult = createState('invite', {
      email: '',
      loading: false,
      error: null,
    });

    const user = { id: 'asd12-23', email: 'email@gmail.com' };
    expectedResult = {
      ...expectedResult,
      invitations: {
        list: [user],
        loading: false,
        error: null,
      },
    };

    const action = {
      type: INVITE_RESEARCHER_SUCCESS,
      payload: { user },
    };
    expect(inviteResearcherReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test INVITE_RESEARCHER_ERROR action', () => {
    const errorMsg = 'Error!';
    const inputValue = 'Test';
    const newState = createState('invite', {
      email: inputValue,
      loading: true,
      error: null,
    });
    const expectedResult = createState('invite', {
      email: inputValue,
      loading: false,
      error: errorMsg,
    });
    const action = {
      type: INVITE_RESEARCHER_ERROR,
      payload: { error: errorMsg },
    };
    expect(inviteResearcherReducer(newState, action)).toEqual(expectedResult);
  });
  it('test GET_INVITATIONS_REQUEST action without array', () => {
    const expectedResult = createState('invitations', {
      list: null,
      loading: true,
      error: null,
    });
    const action = { type: GET_INVITATIONS_REQUEST };
    expect(inviteResearcherReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test GET_INVITATIONS_REQUEST action with array', () => {
    const invitations = [
      {
        id: 'asd-123as',
        email: 'email@gmail.com',
      },
      {
        id: 'a22sd-2123as',
        email: 'email2@gmail.com',
      },
    ];
    const newState = createState('invitations', {
      list: invitations,
      loading: false,
      error: null,
    });
    const expectedResult = createState('invitations', {
      list: invitations,
      loading: false,
      error: null,
    });
    const action = { type: GET_INVITATIONS_REQUEST };
    expect(inviteResearcherReducer(newState, action)).toEqual(expectedResult);
  });
  it('test GET_INVITATIONS_SUCCESS action', () => {
    const invitations = [
      {
        id: 'asd-123as',
        email: 'email@gmail.com',
      },
      {
        id: 'a22sd-2123as',
        email: 'email2@gmail.com',
      },
    ];
    const expectedResult = createState('invitations', {
      list: invitations,
      loading: false,
      error: null,
    });

    const action = {
      type: GET_INVITATIONS_SUCCESS,
      payload: { invitations },
    };
    expect(inviteResearcherReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test GET_INVITATIONS_ERROR action', () => {
    const errorMsg = 'Error!';
    const newState = createState('invitations', {
      list: null,
      loading: true,
      error: null,
    });
    const expectedResult = createState('invitations', {
      list: null,
      loading: false,
      error: errorMsg,
    });
    const action = {
      type: GET_INVITATIONS_ERROR,
      payload: { error: errorMsg },
    };
    expect(inviteResearcherReducer(newState, action)).toEqual(expectedResult);
  });
  it('test CANCEL_INVITATION_REQUEST action', () => {
    const id = '123d-sa2da';
    const expectedResult = createState('cancel', {
      invitationCanceling: id,
    });
    const action = { type: CANCEL_INVITATION_REQUEST, payload: { id } };
    expect(inviteResearcherReducer(undefined, action)).toEqual(expectedResult);
  });
  it('test CANCEL_INVITATION_SUCCESS action', () => {
    const id = '123d-sa2da';
    const invitations = [
      {
        id,
        email: 'email@gmail.com',
      },
      {
        id: 'a22sd-2123as',
        email: 'email2@gmail.com',
      },
    ];
    let newState = createState('invitations', {
      list: invitations,
      loading: false,
      error: null,
    });

    newState = { ...newState, cancel: { invitationCanceling: id } };

    let expectedResult = createState('cancel', {
      invitationCanceling: null,
    });

    expectedResult = {
      ...expectedResult,
      invitations: {
        list: invitations.filter(el => el.id !== id),
        loading: false,
        error: null,
      },
    };

    const action = {
      type: CANCEL_INVITATION_SUCCESS,
      payload: { id },
    };
    expect(inviteResearcherReducer(newState, action)).toEqual(expectedResult);
  });
  it('test CANCEL_INVITATION_ERROR action', () => {
    const id = '123d-sa2da';
    const errorMsg = 'Error!';
    const newState = createState('cancel', {
      invitationCanceling: id,
    });
    const expectedResult = createState('cancel', {
      invitationCanceling: null,
    });
    const action = {
      type: CANCEL_INVITATION_ERROR,
      payload: { error: errorMsg },
    };
    expect(inviteResearcherReducer(newState, action)).toEqual(expectedResult);
  });
  it('test CHANGE_EMAIL_INPUT action', () => {
    const oldInputValue = 'Tes';
    const newInputValue = 'Test';

    const newState = createState('invite', {
      email: oldInputValue,
      loading: false,
      error: null,
    });
    const expectedResult = createState('invite', {
      email: newInputValue,
      loading: false,
      error: null,
    });
    const action = {
      type: CHANGE_EMAIL_INPUT,
      payload: { value: newInputValue },
    };
    expect(inviteResearcherReducer(newState, action)).toEqual(expectedResult);
  });
  it('test CHANGE_ERROR_VALUE action', () => {
    const inputValue = 'Test';
    const oldErrorValue = 'Error!';
    const newErrorValue = null;
    const newState = createState('invite', {
      email: inputValue,
      error: oldErrorValue,
      loading: false,
    });
    const expectedResult = createState('invite', {
      email: inputValue,
      error: newErrorValue,
      loading: false,
    });
    const action = {
      type: CHANGE_ERROR_VALUE,
      payload: { error: 'invite', value: null },
    };
    expect(inviteResearcherReducer(newState, action)).toEqual(expectedResult);
  });
});
