/**
 *
 * Tests for GridQuestion
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import GridQuestion from '../GridQuestion';

describe('<GridQuestion />', () => {
  const mockedFunctions = {
    selectAnswer: jest.fn(),
    saveAnswer: jest.fn(),
  };

  const defaultProps = {
    question: {
      body: {
        data: [
          {
            payload: {
              columns: [
                { payload: 'test', variable: { value: '1' } },
                { payload: 'test', variable: { value: '2' } },
              ],
              rows: [
                { payload: 'test', variable: { name: '1' } },
                { payload: 'test', variable: { name: '2' } },
              ],
            },
          },
        ],
      },
      id: 'test-id',
      settings: {
        proceed_button: true,
      },
    },
    answerBody: [],
    questionIndex: 0,
    ...mockedFunctions,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <GridQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <GridQuestion {...defaultProps} />
        </MemoryRouter>
      </IntlProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
