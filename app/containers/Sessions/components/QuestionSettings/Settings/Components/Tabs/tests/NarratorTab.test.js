/**
 *
 * Tests for NarratorTab
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';
import ReactDOM from 'react-dom';

import { createQuestion } from 'utils/reducerCreators';
import { formatMessage } from 'utils/intlOutsideReact';

import { createTestStore } from 'utils/testUtils/storeUtils';
import NarratorTab from '../NarratorTab';
describe('<NarratorTab />', () => {
  const singleQuestion = createQuestion();

  const mockFunctions = {
    formatMessage,
    onNarratorToggle: jest.fn(),
    onCreate: jest.fn(),
  };

  const initialState = {
    questions: {
      questions: [singleQuestion],
      selectedQuestion: singleQuestion.id,
    },
    questionGroups: {
      groups: [{ id: singleQuestion.question_group_id }],
    },
  };

  const defaultProps = {
    narrator: {
      blocks: [],
      settings: { voice: true, animation: true },
    },
    id: 'test',
    disabled: false,
    ...mockFunctions,
  };

  const store = createTestStore(initialState);

  let modalContainer;
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element) => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <NarratorTab {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <NarratorTab {...defaultProps} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
