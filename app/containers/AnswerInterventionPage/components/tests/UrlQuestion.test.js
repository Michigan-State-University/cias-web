/**
 *
 * Tests for UrlQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import UrlQuestion from '../UrlQuestion';

describe('<UrlQuestion />', () => {
  const mockedFunctions = {
    selectAnswer: jest.fn(),
  };

  const defaultProps = {
    question: {
      body: {
        variable: { name: '1' },
        data: [{ payload: 'test' }],
      },
      id: 'test-id',
    },
    ...mockedFunctions,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <UrlQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <UrlQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
