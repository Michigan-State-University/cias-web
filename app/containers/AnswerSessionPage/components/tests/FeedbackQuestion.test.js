/**
 *
 * Tests for FeedbackQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import FeedbackQuestion from '../FeedbackQuestion';

describe('<FeedbackQuestion />', () => {
  const mockedFunctions = {
    selectAnswer: jest.fn(),
    setFeedbackSettings: jest.fn(),
  };

  const defaultProps = {
    question: {
      body: {
        data: [
          {
            payload: {
              start_value: '0',
              end_value: '100',
              target_value: { match: '=1', target: '10' },
            },
          },
        ],
      },
      id: 'test-id',
    },
    feedbackScreenSettings: {
      showSpectrum: true,
    },
    ...mockedFunctions,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <FeedbackQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <FeedbackQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
