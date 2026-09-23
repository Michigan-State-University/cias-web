import React, { ComponentProps } from 'react';
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

const renderBanner = (
  state: BannerState,
  props: ComponentProps<typeof TestRunBanner> = {},
) =>
  render(
    <Provider store={buildStore(state)}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TestRunBanner {...props} />
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

  describe('when the test link was sent but did not apply', () => {
    it('warns that the link is dead and the session counts as a real participant', () => {
      renderBanner({ testRunMarkerFailed: true });

      expect(
        screen.getByText(/This test link is no longer valid/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/recorded as a real participant/),
      ).toBeInTheDocument();
    });

    it('does not claim the fill is test data', () => {
      renderBanner({ testRunMarkerFailed: true });

      expect(screen.queryByText(/This is a test run/)).not.toBeInTheDocument();
    });

    it('renders a distinct node from the marked-run banner', () => {
      const { container } = renderBanner({ testRunMarkerFailed: true });

      expect(
        container.querySelector('[data-cy="test-run-failed-banner"]'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('[data-cy="test-run-banner"]'),
      ).not.toBeInTheDocument();
    });
  });

  it('renders nothing for an ordinary fill that sent no test link', () => {
    const { container } = renderBanner({});
    expect(container).toBeEmptyDOMElement();
  });

  describe('in preview', () => {
    it('does not render the failure banner', () => {
      const { container } = renderBanner(
        { testRunMarkerFailed: true },
        { isPreview: true },
      );

      expect(container).toBeEmptyDOMElement();
      expect(
        screen.queryByText(/This test link is no longer valid/),
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('[data-cy="test-run-failed-banner"]'),
      ).not.toBeInTheDocument();
    });

    it('still renders the marked-run banner', () => {
      renderBanner({ testRunFill: true }, { isPreview: true });

      expect(screen.getByText(/This is a test run/)).toBeInTheDocument();
    });
  });
});
