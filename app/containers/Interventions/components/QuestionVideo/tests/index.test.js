import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { QuestionVideoWithIntl as QuestionVideo } from '../index';

const defualtProps = {
  selectedQuestion: {
    video_url: null,
  },
  updateVideo: jest.fn(),
};

describe('<QuestionVideo />', () => {
  it('should match the snapshot without video', () => {
    const {
      container: { firstChild: renderedComponent },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <QuestionVideo {...defualtProps} />
      </IntlProvider>,
    );

    expect(renderedComponent).toMatchSnapshot();
  });
  it('should match the snapshot with video', () => {
    const newProps = {
      ...defualtProps,
      selectedQuestion: {
        ...defualtProps.selectedQuestion,
        video_url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
      },
    };

    const {
      container: { firstChild: renderedComponent },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <QuestionVideo {...newProps} />
      </IntlProvider>,
    );

    expect(renderedComponent).toMatchSnapshot();
  });
});
