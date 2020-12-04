import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';

import { createTestStore } from 'utils/testUtils/storeUtils';

import QuestionImage from '../index';

describe('<QuestionImage />', () => {
  let store;
  const testId = 'test-id';
  const initialState = {
    questions: {
      selectedQuestion: testId,
      questions: [{ id: testId, image_url: null }],
    },
  };
  beforeAll(() => {
    store = createTestStore(initialState);
  });

  it('should match the snapshot without file', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionImage />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('should match the snapshot with file', () => {
    const newState = {
      questions: {
        selectedQuestion: testId,
        questions: [{ id: testId, image_url: 'mokc_url.png' }],
      },
    };
    store = createTestStore(newState);

    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionImage />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
