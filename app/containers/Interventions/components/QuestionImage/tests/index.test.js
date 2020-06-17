import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from 'i18n';
import { QuestionImageWithIntl as QuestionImage } from '../index';

const defualtProps = {
  selectedQuestion: {
    id: 'asda123a-123da1203123-213das',
    image_url: '',
  },
  updateFile: jest.fn(),
};

describe('<QuestionImage />', () => {
  it('should match the snapshot without file', () => {
    const renderedComponent = renderer
      .create(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionImage {...defualtProps} />
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should match the snapshot with file', () => {
    const newProps = {
      ...defualtProps,
      selectedQuestion: {
        ...defualtProps.selectedQuestion,
        image_url: 'mock.png',
      },
    };
    const renderedComponent = renderer
      .create(
        <IntlProvider locale={DEFAULT_LOCALE}>
          <QuestionImage {...newProps} />
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
