import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

import CopyLinkForm from '../CopyLinkForm';

const OWNER_ID = 'user-1';
const INTERVENTION_ID = 'int-1';

const intervention = {
  id: INTERVENTION_ID,
  userId: OWNER_ID,
  hasCollaborators: false,
  currentEditor: null,
  sessions: [{ id: 's-1', name: 'Session 1', languageCode: 'en' }],
};

const buildStore = (currentUserId = OWNER_ID) => {
  const state = {
    auth: { user: { id: currentUserId, roles: ['researcher'] } },
    intervention: {
      intervention,
      cache: { intervention: null },
      loaders: { generateTestLink: {} },
      errors: { generateTestLink: {} },
    },
  };

  return {
    dispatch: jest.fn(),
    getState: () => state,
    subscribe: () => () => {},
    replaceReducer: () => {},
  } as any;
};

const defaultProps = {
  isModularIntervention: false,
  isReportingIntervention: false,
  interventionId: INTERVENTION_ID,
  interventionLanguageCode: 'en',
  sessionOptions: [{ value: 's-1', label: 'Session 1' }],
  healthClinicOptions: [],
};

const renderForm = (store: any) =>
  render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        {/* @ts-ignore — connected component fills the `intervention` prop */}
        <CopyLinkForm {...defaultProps} />
      </IntlProvider>
    </Provider>,
  );

describe('<CopyLinkForm />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderForm(buildStore());
    expect(spy).not.toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const { container } = renderForm(buildStore());
    expect(container).toMatchSnapshot();
  });

  // Moved to `TestLinkTab`; this form must not reacquire them.
  it('no longer renders the test-link controls or their caveat', () => {
    renderForm(buildStore());

    expect(
      screen.queryByText('Copy test link to this session'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/private or incognito window/),
    ).not.toBeInTheDocument();
  });

  it('still renders the ordinary copy-link control', () => {
    renderForm(buildStore());

    expect(
      screen.getByText('Copy URL link to this session'),
    ).toBeInTheDocument();
  });
});
