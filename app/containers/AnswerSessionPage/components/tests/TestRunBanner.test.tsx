import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'i18n';

import TestRunBanner from '../TestRunBanner';

type BannerState = {
  testRunFill?: boolean;
  testRunMarkerFailed?: boolean;
};

const buildStore = (state: BannerState) =>
  ({
    dispatch: jest.fn(),
    getState: () => ({
      AnswerSessionPage: {
        testRunFill: false,
        testRunMarkerFailed: false,
        ...state,
      },
    }),
    subscribe: () => () => {},
    replaceReducer: () => {},
  }) as any;

const renderBanner = (state: BannerState) =>
  render(
    <Provider store={buildStore(state)}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TestRunBanner />
      </IntlProvider>
    </Provider>,
  );

describe('<TestRunBanner />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderBanner({ testRunFill: true });
    expect(spy).not.toHaveBeenCalled();
  });

  it('tells the filler the run is test data and will be deleted', () => {
    renderBanner({ testRunFill: true });
    expect(screen.getByText(/This is a test run/)).toBeInTheDocument();
    expect(screen.getByText(/deleted automatically/)).toBeInTheDocument();
  });

  // A refused marker is handled by `TestLinkTokenGate`, which blocks the page outright, so this
  // component never sees that state.
  it('renders nothing when the marker was refused', () => {
    const { container } = renderBanner({ testRunMarkerFailed: true });
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for an ordinary fill that sent no test link', () => {
    const { container } = renderBanner({});
    expect(container).toBeEmptyDOMElement();
  });
});
