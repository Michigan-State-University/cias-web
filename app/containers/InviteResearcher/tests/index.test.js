import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';
import createModalForTests from 'utils/createModalForTests';
import { createTestStore } from 'utils/testUtils/storeUtils';

import InviteResearcher from '../index';

describe('<InviteResearcher />', () => {
  const initialState = {
    invitations: {
      invite: {
        email: '',
        loading: false,
        error: null,
      },
      invitations: {
        list: [
          { id: '293210-12ds12', email: 'email@gmail.com' },
          { id: '2asd-qwer', email: 'email2@gmail.com' },
        ],
        loading: false,
        error: null,
      },
      cancel: {
        invitationCanceling: null,
      },
    },
  };
  createModalForTests();
  let store;

  beforeAll(() => {
    store = createTestStore(initialState);
    store.runSaga = () => ({
      cancel: () => {},
      toPromise: () => Promise.resolve(),
    });
    store.injectedReducers = {};
    store.injectedSagas = {};
  });
  const defaultProps = {
    formatMessage: jest.fn((msg) => msg.defaultMessage),
    onClose: jest.fn(),
    sendInvitation: jest.fn(),
    deleteError: jest.fn(),
    visible: true,
  };
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <InviteResearcher {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <InviteResearcher {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should display invalid email error', () => {
    const invalidEmail = 'invalidemail';
    const { getByPlaceholderText, container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <InviteResearcher {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    const input = getByPlaceholderText('e.g john.doe@contact.com');
    fireEvent.change(input, { target: { value: invalidEmail } });
    fireEvent.blur(input);
    expect(container).toMatchSnapshot();
  });
  it('Should display server error', () => {
    const newState = {
      ...initialState,
      researcherInvitation: {
        ...initialState.researcherInvitation,
        error: 'Server error!',
      },
    };
    store = createTestStore(newState);

    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <InviteResearcher {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should invoke send invitation action', () => {
    const invalidEmail = 'invalidemail';
    const validEmail = 'test@email.com';
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <InviteResearcher {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    const input = getByPlaceholderText('e.g john.doe@contact.com');
    const button = getByText('Send invitation');
    fireEvent.change(input, { target: { value: invalidEmail } });
    fireEvent.blur(input);
    fireEvent.click(button);
    expect(input.value).toEqual(invalidEmail);

    fireEvent.change(input, { target: { value: validEmail } });
    fireEvent.blur(input);
    fireEvent.click(button);
  });
  it('Should invoke onClose', () => {
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <InviteResearcher {...defaultProps} />
        </IntlProvider>
      </Provider>,
    );
    const closeIcon = document.querySelector('img[alt="Close window"]');
    fireEvent.click(closeIcon);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
