import React from 'react';
import { render, waitFor } from '@testing-library/react';
import 'jest-styled-components';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { Provider } from 'react-redux';
import { elements } from 'theme';

import { draft } from 'models/Status/StatusTypes';
import settingsTabLabels from 'utils/settingsTabsLabels';
import { formatMessage } from 'utils/testUtils/formatMessage';
import { createTestStore } from 'utils/testUtils/storeUtils';

import QuestionDetails from '../index';

window.HTMLMediaElement.prototype.pause = () => {};

describe('<QuestionDetails />', () => {
  const testId = 'testId';
  const initialState = {
    intervention: {
      intervention: {
        status: draft,
      },
    },
    questions: {
      selectedQuestion: testId,
      questions: [
        {
          id: testId,
          session_id: 'a8169-faf5e14',
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
    localState: {
      questionSettings: {
        visibility: false,
        tab: settingsTabLabels.settings,
      },
      previewData: {
        animation: 'standStill',
        type: 'BodyAnimation',
      },
      animationPosition: elements.characterInitialPosition,
    },
  };

  const props = {
    currentGroupScope: { title: 'Test group', id: 'test-group-1' },
    formatMessage,
  };

  const store = createTestStore(initialState);

  it('should match the snapshot', async () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionDetails {...props} />
        </IntlProvider>
      </Provider>,
    );
    await waitFor(() => getByText('Continue'));
    expect(container).toMatchSnapshot();
  });
});
