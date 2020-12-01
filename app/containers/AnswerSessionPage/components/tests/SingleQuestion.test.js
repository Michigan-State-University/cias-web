/**
 *
 * Tests for SingleQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import SingleQuestion from '../SingleQuestion';

describe('<SingleQuestion />', () => {
  const mockedFunctions = {
    selectAnswer: jest.fn(),
  };

  const defaultProps = {
    question: {
      body: {
        data: [
          {
            payload: 'test',
            value: '1',
          },
          {
            payload: 'test',
            value: '2',
          },
        ],
        variable: '1',
      },
      id: 'test-id',
      settings: {
        proceed_button: true,
      },
    },
    questionIndex: 0,
    answerBody: [],
    ...mockedFunctions,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <SingleQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <SingleQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
