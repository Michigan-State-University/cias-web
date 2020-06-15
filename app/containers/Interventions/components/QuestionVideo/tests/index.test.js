import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { QuestionVideoWithIntl as QuestionVideo } from '../index';

const defualtProps = {
  selectedQuestion: {
    video: null,
  },
  updateVideo: jest.fn(),
};

describe('<QuestionVideo />', () => {
  it('should match the snapshot without video', () => {
    const renderedComponent = renderer
      .create(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionVideo {...defualtProps} />
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should match the snapshot with video', () => {
    const newProps = {
      ...defualtProps,
      selectedQuestion: {
        ...defualtProps.selectedQuestion,
        video: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
      },
    };
    const renderedComponent = renderer
      .create(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionVideo {...newProps} />
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
