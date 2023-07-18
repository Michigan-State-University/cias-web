/**
 *
 * Tests for NumberQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { formatMessage } from 'utils/intlOutsideReact';

import NumberQuestion from '../NumberQuestion';

describe('<NumberQuestion />', () => {
  const mockedFunctions = {
    selectAnswer: jest.fn(),
    formatMessage,
    showError: jest.fn(),
  };

  const defaultProps = {
    question: {
      body: {
        variable: 'test',
      },
      settings: {},
    },
    answerBody: [],
    ...mockedFunctions,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <NumberQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <NumberQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
