import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from 'configureStore';
import QuestionListItem from '../index';

describe('<QuestionListItem />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('should match the snapshot', () => {
    const question = { title: 'Test', type: 'Question::Single' };
    const renderedComponent = renderer
      .create(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <QuestionListItem question={question} />
          </IntlProvider>
        </Provider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
