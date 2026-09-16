import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from 'configureStore';

import { QuestionTypes } from 'models/Question';
import { withDroppable } from 'utils/testUtils/dndUtils';

import QuestionListItem from '../index';

describe('<QuestionListItem />', () => {
  let store;
  let modalContainer;

  beforeAll(() => {
    store = configureStore(browserHistory, {});

    ReactDOM.createPortal = jest.fn((element) => element);
    modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-portal');
    document.body.appendChild(modalContainer);
  });
  it('should match the snapshot', () => {
    const question = {
      id: 'test-1',
      title: 'Test title',
      subtitle: 'Test subtitle',
      type: QuestionTypes.SINGLE,
    };

    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          {withDroppable(
            <QuestionListItem
              question={question}
              index={0}
              isDraggableScreen
            />,
          )}
        </IntlProvider>
      </Provider>,
    );

    expect(firstChild).toMatchSnapshot();
  });
});
