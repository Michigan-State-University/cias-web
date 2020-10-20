import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from 'configureStore';

import { singleQuestion } from 'models/Intervention/QuestionTypes';

import QuestionListItem from '../index';

describe('<QuestionListItem />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('should match the snapshot', () => {
    const question = {
      id: 'test-1',
      title: 'Test title',
      subtitle: 'Test subtitle',
      type: singleQuestion.id,
    };

    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <DragDropContext>
            <Droppable>
              {() => <QuestionListItem question={question} index={0} />}
            </Droppable>
          </DragDropContext>
        </IntlProvider>
      </Provider>,
    );

    expect(firstChild).toMatchSnapshot();
  });
});
