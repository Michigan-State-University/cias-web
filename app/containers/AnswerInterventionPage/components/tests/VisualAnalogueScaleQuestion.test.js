/**
 *
 * Tests for VisualAnalogueScaleQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import VisualAnalogueScaleQuestion from '../VisualAnalogueScaleQuestion';

describe('<VisualAnalogueScaleQuestion />', () => {
  const mockedFunctions = {
    selectAnswer: jest.fn(),
  };

  const defaultProps = {
    question: {
      body: {
        data: [
          {
            payload: { start_value: '0', end_value: '100' },
          },
        ],
        variable: { name: '1' },
      },
      id: 'test-id',
      settings: { show_number: true },
    },
    answerBody: [],
    ...mockedFunctions,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <VisualAnalogueScaleQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <VisualAnalogueScaleQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
