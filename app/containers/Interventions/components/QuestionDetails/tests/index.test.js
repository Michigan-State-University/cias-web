import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import 'jest-styled-components';
import { createStore } from 'redux';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';
import settingsTabLabels from 'utils/settingsTabsLabels';
import { elements } from 'theme';

import QuestionDetails from '../index';

window.HTMLMediaElement.prototype.pause = () => {};

describe('<QuestionDetails />', () => {
  let store;
  const reducer = state => state;
  const initialState = {
    editInterventionPage: {
      questionSettings: {
        visibility: false,
        tab: settingsTabLabels.settings,
      },
      previewData: {
        animation: 'standStill',
        type: 'BodyAnimation',
      },
      animationPosition: {
        x: 0,
        y: elements.peedyInitialYPosition,
      },
      selectedQuestion: 0,
      questions: [
        {
          id: '1mna9s2-2as',
          intervention_id: 'a8169-faf5e14',
          type: 'Question::Number',
          position: 1,
          title: 'Title',
          subtitle: 'Subtitle',
          image_url: 'imageUrl',
          video_url: 'videoUrl',
          settings: {
            video: false,
            image: false,
            title: true,
            subtitle: true,
            proceed_button: true,
          },
          narrator: {
            settings: {
              voice: true,
              animation: true,
            },
          },
          body: {
            data: [{ payload: '' }],
            variable: { name: '' },
          },
          formula: {
            payload: '',
            patterns: [],
          },
        },
      ],
    },
  };

  beforeAll(() => {
    store = createStore(reducer, initialState);
    store.runSaga = () => {};
    store.injectedReducers = {};
    store.injectedSagas = {};
  });

  it('should match the snapshot', async () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionDetails />
        </IntlProvider>
      </Provider>,
    );
    await waitForElement(() => getByText('Next screen'));
    expect(container).toMatchSnapshot();
  });
});
